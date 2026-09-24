<div align="center">

<img src="./hiremate-logo.png" width="90" alt="HireMate Logo"/>

# HireMate

### AI-Powered Interview Preparation Platform

**Practice realistic interviews • Interact through voice • Get AI-powered feedback • Track your performance**

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-REST_API-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-412991?style=for-the-badge)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?style=for-the-badge)

<br/>

**A full-stack AI interview platform built with React, Node.js, Express, MongoDB and modern AI APIs.**

<br/>

[Features](#-features) •
[Architecture](#-architecture) •
[Tech Stack](#-technology-stack) •
[Setup](#-getting-started) •
[Roadmap](#-roadmap)

</div>

---

# 🚀 Overview

**HireMate** is a full-stack AI-powered interview preparation platform designed to simulate realistic **technical and HR interview experiences**.

Instead of relying on static question lists, HireMate creates an interactive interview workflow where candidates can configure an interview, interact with an AI interviewer, answer questions using voice, receive AI-powered evaluation and analyse their performance afterwards.

### What HireMate provides

- 🎯 AI-generated interview questions
- 👔 HR interview mode
- 💻 Technical interview mode
- 📄 Resume-based interview preparation
- 🎙️ Voice-based interview interaction
- ⏱️ Timed interview questions
- 🧠 AI-powered answer evaluation
- 📊 Confidence, communication and correctness analysis
- 📈 Performance analytics
- 📜 Interview history
- 📄 Downloadable PDF reports
- 💳 Credit-based interview system
- 🔐 Firebase + JWT authentication
- 💰 Razorpay payment integration

The project combines **full-stack development, AI integration, browser APIs, authentication, payments, analytics and persistent data storage** into a single application.

---

# ✨ Features

## 🎯 AI-Powered Interviews

HireMate dynamically generates interview questions based on the candidate's interview configuration.

The interview can consider:

- Target role
- Experience level
- Resume information
- Technical skills
- Projects
- Selected interview type

This makes the interview experience more personalised than a traditional static question bank.

---

## 👔 HR Interview Mode

Designed for behavioural and communication-focused preparation.

Examples of evaluation areas include:

- Communication
- Confidence
- Clarity
- Relevance
- Behavioural responses
- Overall answer quality

---

## 💻 Technical Interview Mode

Designed for technical interview preparation based on the candidate's selected role and profile.

The system can generate role-relevant technical questions and evaluate the submitted answers using AI.

---

## 📄 Resume Analysis

Candidates can provide resume information during interview setup.

The system can use information such as:

- Projects
- Technical skills
- Experience
- Relevant technologies

to create a more personalised interview experience.

---

# 🎙️ Voice-Based Interview

One of the core features of HireMate is its browser-based voice interaction.

The interview experience supports:

- 🔊 AI question speech
- 🎤 Speech recognition
- 🗣️ Voice-based answers
- ⏱️ Timed responses
- 🔄 Interactive question-answer flow
- 👨 Male AI interviewer experience
- 👩 Female AI interviewer experience

The goal is to make the interview experience feel closer to an actual interview rather than a traditional form.

---

# 🧠 AI Answer Evaluation

After a candidate submits an answer, HireMate sends the response through the AI evaluation workflow.

The system can provide feedback around:

| Evaluation Area | Description |
|---|---|
| 🎯 Correctness | How accurately the answer addresses the question |
| 💬 Communication | Clarity and quality of communication |
| 🧠 Confidence | Confidence-related evaluation |
| 📌 Relevance | How relevant the answer is |
| ✨ Clarity | Structure and understandability |
| 📝 Answer Quality | Overall response quality |
| 💡 Feedback | Question-specific AI feedback |

---

# 📊 Interview Analytics

After completing an interview, HireMate provides a detailed performance overview.

### Overall Performance

A consolidated performance score for the interview.

### Skill Evaluation

The platform evaluates key areas including:

- Confidence
- Communication
- Correctness

### Performance Trend

A visual representation of performance across interview questions.

### Question-Level Analysis

Each question can include:

- Original interview question
- Candidate answer
- Score
- AI evaluation
- Feedback

### PDF Report

Interview results can be exported through the **Download PDF** functionality.

---

# 📸 Product Showcase

## 🧩 Interview Setup

Candidates can configure their interview before starting.

The setup workflow includes:

- Candidate profile
- Experience
- Interview type
- Resume analysis
- Projects
- Skills
- Interview configuration

![HireMate Interview Setup](./screenshots/03-interview-setup.png)

---

## 👔 HR & 💻 Technical Interview Modes

HireMate provides different interview experiences depending on the candidate's preparation goal.

![HireMate Interview Modes](./screenshots/04-interview-modes.png)

---

## 📜 Interview History

Candidates can review their previous interviews and track their progress over time.

History can contain information such as:

- Role
- Experience
- Interview type
- Date
- Overall score
- Completion status

![HireMate Interview History](./screenshots/05-interview-history.png)

---

## 📈 Analytics Dashboard

The analytics dashboard provides a detailed overview of interview performance.

![HireMate Analytics Dashboard](./screenshots/06-analytics-dashboard.png)

---

# 🏗️ Architecture

HireMate follows a separated **frontend + backend architecture**.

```mermaid
flowchart TB

    USER[👤 Candidate]

    FRONTEND[⚛️ React Frontend]

    AUTH[🔐 Authentication]

    API[🚀 Express REST API]

    CONTROLLERS[🎮 Controllers]

    SERVICES[⚙️ Services]

    AI[🧠 OpenRouter AI]

    DB[(🍃 MongoDB)]

    PAYMENT[💳 Razorpay]

    USER --> FRONTEND

    FRONTEND --> AUTH
    FRONTEND --> API

    API --> CONTROLLERS

    CONTROLLERS --> SERVICES
    CONTROLLERS --> DB

    SERVICES --> AI
    SERVICES --> PAYMENT

    AUTH --> API

    DB --> API
    AI --> API




📁 Project Structure


HireMate/
│
├── backend/
│   │
│   ├── config/
│   │   ├── connectDb.js
│   │   └── token.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── interview.controller.js
│   │   ├── payment.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   ├── isAuth.js
│   │   └── multer.js
│   │
│   ├── models/
│   │   ├── interview.model.js
│   │   ├── payment.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── interview.route.js
│   │   ├── payment.route.js
│   │   └── user.route.js
│   │
│   ├── services/
│   │   ├── openRouter.service.js
│   │   └── razorpay.service.js
│   │
│   ├── public/
│   ├── .env
│   └── index.js
│
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── AuthModel.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Step1SetUp.jsx
│   │   │   ├── Step2Interview.jsx
│   │   │   ├── Step3Report.jsx
│   │   │   └── Timer.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── InterviewHistory.jsx
│   │   │   ├── InterviewPage.jsx
│   │   │   ├── InterviewReport.jsx
│   │   │   └── Pricing.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── userSlice.js
│   │   │
│   │   ├── utils/
│   │   │   └── firebase.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│   ├── 03-interview-setup.png
│   ├── 04-interview-modes.png
│   ├── 05-interview-history.png
│   └── 06-analytics-dashboard.png
│
├── hiremate-logo.png
└── README.md

    API --> FRONTEND
