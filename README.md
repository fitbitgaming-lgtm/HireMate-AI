<div align="center">

<img src="./hiremate-logo.png" width="90" alt="HireMate Logo"/>

# HireMate

### AI-Powered Interview Preparation Platform

Practice realistic interviews, interact through voice, receive AI-powered evaluation, and track your performance over time.

<br/>

![React](https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Fast%20Builds-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-412991?style=for-the-badge)

<br/>

**An end-to-end AI interview platform built with React, Node.js, Express, MongoDB and modern AI APIs.**

</div>

---

# 🚀 Overview

**HireMate** is a full-stack AI-powered interview preparation platform designed to simulate realistic technical and HR interview experiences.

Instead of simply generating interview questions, HireMate creates an interactive interview workflow where users can:

- Configure an interview based on their role and experience
- Analyse resume information
- Choose between HR and Technical interview modes
- Interact with an AI interviewer using voice
- Answer questions in a timed environment
- Receive AI-generated feedback
- Analyse communication, confidence and correctness
- Review previous interview sessions
- Track performance through analytics
- Download interview reports as PDF
- Manage interview credits
- Authenticate securely using Firebase/JWT
- Purchase additional credits through Razorpay

The project combines **full-stack engineering, AI integration, voice interaction, analytics, authentication, payments and data persistence** into a single application.

---

# ✨ Core Features

## 🎯 AI-Powered Interviews

HireMate dynamically generates interview questions according to the candidate's:

- Target role
- Experience level
- Resume
- Technical skills
- Selected interview type

The interview can adapt to both technical and behavioural scenarios.

---

## 🧑‍💻 Multiple Interview Modes

HireMate provides different interview experiences:

| Mode | Purpose |
|---|---|
| 👔 HR Interview | Behavioural and communication-based evaluation |
| 💻 Technical Interview | Technical questioning based on the selected role |
| 🎙️ Voice Interview | Interactive spoken interview experience |
| 📊 Performance Analysis | Post-interview evaluation and insights |

---

## 📄 Resume Analysis

Users can provide resume information that can be used to create more relevant interview questions.

The interview setup can extract and display:

- Projects
- Technical skills
- Experience
- Relevant technologies

This allows the interview experience to be more personalised instead of relying only on generic questions.

---

## 🎙️ Voice-Based Interview

HireMate supports browser-based voice interaction.

The interview experience includes:

- AI-generated questions
- Text-to-speech
- Speech recognition
- Voice-based answers
- Real-time interview interaction
- Timer-based responses
- Male/Female AI interviewer experience

The goal is to make the session feel closer to an actual interview rather than a traditional question-answer form.

---

# 🧠 AI Evaluation

After answering interview questions, HireMate evaluates the response and provides AI-generated feedback.

Evaluation includes areas such as:

- **Confidence**
- **Communication**
- **Correctness**
- Answer quality
- Relevance
- Clarity
- Question-specific feedback

Example evaluation dashboard:

![Interview Analytics](./screenshots/06-analytics-dashboard.png)

---

# 📊 Interview Analytics

Each completed interview can generate an analytics dashboard containing:

### Overall Performance

A consolidated score representing the interview performance.

### Skill Evaluation

The platform evaluates:

- Confidence
- Communication
- Correctness

### Performance Trend

A visual representation of performance across interview questions.

### Question Breakdown

Each question can contain:

- The original interview question
- Score
- AI feedback
- Answer evaluation

### PDF Report

Interview analytics can also be exported through the **Download PDF** functionality.

---

# 📸 Product Preview

## Interview Setup

Users configure their interview before starting the session.

The setup includes:

- Candidate profile
- Experience
- Interview type
- Resume analysis
- Projects
- Skills
- Start Interview workflow

![Interview Setup](./screenshots/03-interview-setup.png)

---

## Multiple Interview Modes

HireMate provides dedicated experiences for different interview scenarios.

![Interview Modes](./screenshots/04-interview-modes.png)

---

## Interview History

Users can track previous interviews and review their performance over time.

Each history entry contains information such as:

- Role
- Experience
- Interview type
- Date
- Overall score
- Completion status

![Interview History](./screenshots/05-interview-history.png)

---

## Analytics Dashboard

The analytics dashboard provides detailed performance insights after an interview.

![Analytics Dashboard](./screenshots/06-analytics-dashboard.png)

---

# 🏗️ System Architecture

```mermaid
flowchart TB

    USER[👤 Candidate]

    UI[React Frontend]

    AUTH[Authentication]

    API[Express REST API]

    CTRL[Controllers]

    SERVICES[Backend Services]

    AI[OpenRouter AI]

    DB[(MongoDB)]

    PAYMENT[Razorpay]

    USER --> UI

    UI --> AUTH
    UI --> API

    API --> CTRL

    CTRL --> SERVICES
    CTRL --> DB

    SERVICES --> AI
    SERVICES --> PAYMENT

    AUTH --> API

    DB --> API
    AI --> API

    API --> UI
<img width="2596" height="734" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/08b131c2-187c-4edf-8112-bea1c597e238" />
