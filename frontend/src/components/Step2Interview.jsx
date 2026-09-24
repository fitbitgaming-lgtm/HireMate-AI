import React, { useEffect, useRef, useState } from "react";
import maleVideo from "../assets/videos/male-ai.mp4";
import femaleVideo from "../assets/videos/female-ai.mp4";
import Timer from "./Timer";
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import axios from "axios";
import { ServerUrl } from "../App";
import { BsArrowRight } from "react-icons/bs";

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const isMicOnRef = useRef(false);
  const isAIPlayingRef = useRef(false);

  // Prevent the same intro/question speech from being triggered more than once.
  const spokenQuestionRef = useRef(null);

  // Prevent state updates from an old speech promise after a new speech starts.
  const speechIdRef = useRef(0);

  const currentQuestion = questions[currentIndex];

  isMicOnRef.current = isMicOn;
  isAIPlayingRef.current = isAIPlaying;

  /* =========================
     LOAD SYSTEM VOICES
  ========================= */

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis?.getVoices() || [];
      if (!voices.length) return;

      const femaleVoice = voices.find((v) => {
        const name = v.name.toLowerCase();
        return (
          name.includes("zira") ||
          name.includes("samantha") ||
          name.includes("female")
        );
      });

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice = voices.find((v) => {
        const name = v.name.toLowerCase();
        return (
          name.includes("david") ||
          name.includes("mark") ||
          name.includes("male")
        );
      });

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const videoSource =
    voiceGender === "male" ? maleVideo : femaleVideo;

  /* =========================
     MIC CONTROL
  ========================= */

  const stopMic = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    try {
      recognition.stop();
    } catch {}
  };

  const startMic = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      console.warn("Speech recognition is not available.");
      return;
    }

    if (isAIPlayingRef.current) {
      return;
    }

    if (!isMicOnRef.current) {
      return;
    }

    try {
      recognition.start();
    } catch (error) {
      // Calling start() while already running throws InvalidStateError.
      // It is safe to ignore that case.
      if (error?.name !== "InvalidStateError") {
        console.error("Mic start error:", error);
      }
    }
  };

  const toggleMic = () => {
    if (isMicOnRef.current) {
      stopMic();
      setIsMicOn(false);
      isMicOnRef.current = false;
      return;
    }

    if (isAIPlayingRef.current) {
      return;
    }

    setIsMicOn(true);
    isMicOnRef.current = true;

    // Give React/browser one tick before starting recognition.
    setTimeout(() => {
      if (isMicOnRef.current && !isAIPlayingRef.current) {
        startMic();
      }
    }, 100);
  };

  /* =========================
     SPEECH RECOGNITION
  ========================= */

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error(
        "Speech Recognition is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("🎤 Mic started");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        if (event.results[i].isFinal) {
          finalTranscript +=
            event.results[i][0].transcript;
        }
      }

      if (finalTranscript.trim()) {
        setAnswer((prev) =>
          prev
            ? `${prev} ${finalTranscript.trim()}`
            : finalTranscript.trim()
        );
      }
    };

    recognition.onerror = (event) => {
      console.error(
        "🎤 Speech recognition error:",
        event.error
      );

      // Do not restart automatically.
      // Chrome/Brave can report "network" and restarting here
      // creates an infinite start -> error -> stop loop.
      if (event.error === "not-allowed" ||
          event.error === "service-not-allowed") {
        setIsMicOn(false);
        isMicOnRef.current = false;
      }
    };

    recognition.onend = () => {
      console.log("🎤 Mic stopped");

      // Intentionally no automatic start() here.
      // The user controls the microphone with the button.
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}

      recognitionRef.current = null;
    };
  }, []);

  /* =========================
     AI SPEECH
  ========================= */

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      const speechId = ++speechIdRef.current;

      // Stop any previous utterance before starting a new one.
      window.speechSynthesis.cancel();

      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        if (speechId !== speechIdRef.current) return;

        setIsAIPlaying(true);
        isAIPlayingRef.current = true;

        stopMic();

        videoRef.current?.play().catch(() => {});
      };

      utterance.onend = () => {
        if (speechId !== speechIdRef.current) {
          resolve();
          return;
        }

        videoRef.current?.pause();

        if (videoRef.current) {
          videoRef.current.currentTime = 0;
        }

        setIsAIPlaying(false);
        isAIPlayingRef.current = false;

        setSubtitle("");

        resolve();
      };

      utterance.onerror = () => {
        if (speechId !== speechIdRef.current) {
          resolve();
          return;
        }

        setIsAIPlaying(false);
        isAIPlayingRef.current = false;
        setSubtitle("");

        resolve();
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  /* =========================
     INTRO + QUESTION SPEECH
  ========================= */

  useEffect(() => {
    if (!selectedVoice) return;

    const speechKey = isIntroPhase
      ? "intro"
      : `question-${currentIndex}`;

    // This is the main protection against duplicate speech,
    // including React StrictMode development re-runs.
    if (spokenQuestionRef.current === speechKey) {
      return;
    }

    spokenQuestionRef.current = speechKey;

    let cancelled = false;

    const runSpeech = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        if (cancelled) return;

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        if (cancelled) return;

        setIsIntroPhase(false);
        return;
      }

      if (!currentQuestion) return;

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      if (cancelled) return;

      if (currentIndex === questions.length - 1) {
        await speakText(
          "Alright, this one might be a bit more challenging."
        );

        if (cancelled) return;
      }

      await speakText(currentQuestion.question);
    };

    runSpeech();

    return () => {
      cancelled = true;
    };
  }, [
    selectedVoice,
    isIntroPhase,
    currentIndex,
    currentQuestion,
    questions.length,
    userName
  ]);

  /* =========================
     TIMER
  ========================= */

  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIntroPhase, currentIndex]);

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(
        currentQuestion.timeLimit || 60
      );
    }
  }, [currentIndex, isIntroPhase, currentQuestion]);

  /* =========================
     SUBMIT ANSWER
  ========================= */

  const submitAnswer = async () => {
    if (isSubmitting) return;

    stopMic();
    setIsMicOn(false);
    isMicOnRef.current = false;

    setIsSubmitting(true);

    try {
      const result = await axios.post(
        `${ServerUrl}/api/interview/submit-answer`,
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken:
            currentQuestion.timeLimit - timeLeft
        },
        {
          withCredentials: true
        }
      );

      const newFeedback = result.data.feedback;

      setFeedback(newFeedback);

      await speakText(newFeedback);

      setIsSubmitting(false);
    } catch (error) {
      console.error(
        "Submit answer error:",
        error
      );

      setIsSubmitting(false);
    }
  };

  /* =========================
     NEXT QUESTION
  ========================= */

  const handleNext = async () => {
    stopMic();

    setIsMicOn(false);
    isMicOnRef.current = false;

    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      await finishInterview();
      return;
    }

    await speakText(
      "Alright, let's move to the next question."
    );

    setCurrentIndex((prev) => prev + 1);
  };

  /* =========================
     FINISH INTERVIEW
  ========================= */

  const finishInterview = async () => {
    stopMic();

    setIsMicOn(false);
    isMicOnRef.current = false;

    try {
      const result = await axios.post(
        `${ServerUrl}/api/interview/finish`,
        { interviewId },
        { withCredentials: true }
      );

      console.log(result.data);

      onFinish(result.data);
    } catch (error) {
      console.error(
        "Finish interview error:",
        error
      );
    }
  };

  /* =========================
     AUTO SUBMIT
  ========================= */

  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    if (
      timeLeft === 0 &&
      !isSubmitting &&
      !feedback
    ) {
      submitAnswer();
    }
  }, [
    timeLeft,
    isIntroPhase,
    currentQuestion,
    isSubmitting,
    feedback
  ]);

  /* =========================
     CLEANUP
  ========================= */

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {}

      try {
        recognitionRef.current?.abort();
      } catch {}

      window.speechSynthesis?.cancel();
    };
  }, []);

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">

        {/* VIDEO SECTION */}

        <div className="w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200">

          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>

          {subtitle && (
            <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed">
                {subtitle}
              </p>
            </div>
          )}

          <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5">

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Interview Status
              </span>

              {isAIPlaying && (
                <span className="text-sm font-semibold text-emerald-600">
                  AI Speaking
                </span>
              )}
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex justify-center">
              <Timer
                timeLeft={timeLeft}
                totalTime={currentQuestion?.timeLimit}
              />
            </div>

            <div className="h-px bg-gray-200" />

            <div className="grid grid-cols-2 gap-6 text-center">

              <div>
                <span className="text-2xl font-bold text-emerald-600">
                  {currentIndex + 1}
                </span>

                <div className="text-xs text-gray-400">
                  Current Questions
                </div>
              </div>

              <div>
                <span className="text-2xl font-bold text-emerald-600">
                  {questions.length}
                </span>

                <div className="text-xs text-gray-400">
                  Total Questions
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* TEXT SECTION */}

        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative">

          <h2 className="text-xl sm:text-2xl font-bold text-emerald-600 mb-6">
            AI Smart Interview
          </h2>

          {!isIntroPhase && (
            <div className="relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">

              <p className="text-xs sm:text-sm text-gray-400 mb-2">
                Question {currentIndex + 1} of{" "}
                {questions.length}
              </p>

              <div className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed">
                {currentQuestion?.question}
              </div>
            </div>
          )}

          <textarea
            placeholder="Type your answer here..."
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            value={answer}
            className="flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800"
          />

          {!feedback ? (
            <div className="flex items-center gap-4 mt-6">

              <motion.button
                onClick={toggleMic}
                disabled={isAIPlaying}
                whileTap={{ scale: 0.9 }}
                title={
                  isMicOn
                    ? "Turn microphone off"
                    : "Turn microphone on"
                }
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg disabled:opacity-50"
              >
                {isMicOn ? (
                  <FaMicrophone size={20} />
                ) : (
                  <FaMicrophoneSlash size={20} />
                )}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:bg-gray-500"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Answer"}
              </motion.button>

            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm"
            >

              <p className="text-emerald-700 font-medium mb-4">
                {feedback}
              </p>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-1"
              >
                Next Question
                <BsArrowRight size={18} />
              </button>

            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Step2Interview;
