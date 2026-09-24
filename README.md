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

🧩 Application Architecture
The project follows a separated frontend/backend architecture.
HireMate
│
├── frontend
│   ├── React
│   ├── Vite
│   ├── Redux
│   ├── React Router
│   ├── Tailwind CSS
│   └── UI Components
│
└── backend
    ├── Node.js
    ├── Express.js
    ├── Controllers
    ├── Routes
    ├── Middleware
    ├── Services
    ├── Models
    └── MongoDB

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
└── frontend/
    │
    ├── public/
    │
    ├── src/
    │   │
    │   ├── assets/
    │   │
    │   ├── components/
    │   │   ├── AuthModel.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Step1SetUp.jsx
    │   │   ├── Step2Interview.jsx
    │   │   ├── Step3Report.jsx
    │   │   └── Timer.jsx
    │   │
    │   ├── pages/
    │   │   ├── Auth.jsx
    │   │   ├── Home.jsx
    │   │   ├── InterviewHistory.jsx
    │   │   ├── InterviewPage.jsx
    │   │   ├── InterviewReport.jsx
    │   │   └── Pricing.jsx
    │   │
    │   ├── redux/
    │   │   ├── store.js
    │   │   └── userSlice.js
    │   │
    │   ├── utils/
    │   │   └── firebase.js
    │   │
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    │
    ├── .env
    ├── index.html
    ├── package.json
    └── vite.config.js


⚙️ Tech Stack
Frontend

| Technology | Usage |
|---|---|
| React | Frontend UI |
| Vite | Development & build tooling |
| React Router | Client-side routing |
| Redux | Global state management |
| Axios | API communication |
| Tailwind CSS | Styling |
| Recharts | Analytics visualisation |
| React Icons | UI icons |
| Firebase | Authentication |
| Web Speech API | Voice interaction |


Backend
Technology	Usage
Node.js	Server runtime
Express.js	REST API
MongoDB	Persistent database
Mongoose	MongoDB ODM
JWT	Authentication/token handling
Multer	File handling
OpenRouter	AI integration
Razorpay	Payments


🔌 Backend API Architecture
The backend is organised using a modular REST API structure.

/api
│
├── auth
│   └── Authentication & user access
│
├── interview
│   └── Interview lifecycle
│
├── user
│   └── User profile / credits
│
└── payment
    └── Payment & credit transactions

🔐 Authentication
HireMate uses authentication mechanisms to protect user-specific functionality.
Authentication includes:
- Firebase authentication
- JWT-based backend authentication
- Protected routes
- User-specific interview history
- User-specific credits
- Secure API access

🧠 Engineering Highlights
1. Full-Stack Architecture
The project is split into independent frontend and backend applications, allowing each layer to evolve independently.
2. AI Integration
AI functionality is isolated into backend services rather than exposing AI provider logic directly inside the frontend.
3. Voice Interaction
The interview interface combines browser speech APIs with the application's AI workflow to create a conversational interview experience.
4. Persistent Interview Data
Interview sessions, scores and user information are persisted using MongoDB.
5. Modular Backend
Controllers, routes, services, models and middleware are separated into dedicated modules.
6. Analytics
Interview results are transformed into structured performance metrics and visualised using charts and skill indicators.
7. Payment Integration
Razorpay integration enables the credit system to support premium interview usage.
8. PDF Reporting
Interview performance can be exported as a downloadable PDF report.

🛠️ Key Engineering Challenges
AI Response Handling
AI-generated interview questions and evaluations need to be converted into predictable application data before being consumed by the frontend.
Approach: AI interaction is isolated in a dedicated backend service layer.

Voice Recognition
Browser speech recognition can behave differently across browsers and environments.
Approach: The interview interface manages speech recognition state, answer submission and fallback interaction directly within the interview workflow.

📊 Product Capability Matrix

| Capability | HireMate |
|---|:---:|
| AI-generated questions | ✅ |
| Technical interviews | ✅ |
| HR interviews | ✅ |
| Voice interaction | ✅ |
| Resume analysis | ✅ |
| AI answer evaluation | ✅ |
| Confidence evaluation | ✅ |
| Communication evaluation | ✅ |
| Correctness evaluation | ✅ |
| Interview history | ✅ |
| Analytics dashboard | ✅ |
| Performance trends | ✅ |
| Question-level feedback | ✅ |
| PDF reports | ✅ |
| Authentication | ✅ |
| Credit system | ✅ |
| Razorpay integration | ✅ |
| MongoDB persistence | ✅ |


🔮 Future Roadmap
Potential areas for further development include:
- [ ] More advanced adaptive questioning
- [ ] Industry-specific interview templates
- [ ] More detailed speech analytics
- [ ] Advanced resume parsing
- [ ] Interview comparison across multiple sessions
- [ ] Role-specific evaluation frameworks
- [ ] Recruiter/interviewer dashboard
- [ ] Real-time collaborative interviews
- [ ] More detailed AI coaching
- [ ] Cloud deployment and monitoring
- [ ] Automated CI/CD pipeline


📚 What This Project Demonstrates
HireMate demonstrates practical experience across multiple areas of software engineering:
Frontend Engineering
React • Vite • Routing • State Management • Component Architecture
Backend Engineering
Node.js • Express • REST APIs • Controllers • Services • Middleware
Database Engineering
MongoDB • Mongoose • Persistent Data Models
AI Engineering
AI APIs • Prompt-driven workflows • AI Evaluation • Personalised Questions
Browser APIs
Speech Recognition • Speech Synthesis • Voice Interaction
Authentication
Firebase • JWT • Protected APIs
Payments
Razorpay • Credit Management
Data Visualisation
Charts • Performance Metrics • Skill Evaluation

👨‍💻 Developer
<div align="center">

Aryan Jaiswal
B.Tech Computer Science Engineering
Full-Stack Developer • AI Engineer • Problem Solver
Building practical applications at the intersection of Software Engineering and AI.
</div>

Thank you for being here and taking the time to read this far. I truly appreciate it. ❤️
