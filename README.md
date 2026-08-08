# 🚀 AI Mock Interview Platform — Team The Aarambhies

> An intelligent, real-time AI-powered technical and behavioral interview platform designed to conduct adaptive mock sessions, deliver deep performance analytics, and issue verifiable Job Readiness Badges.

---

## 🌟 Key Features & Phase Breakdowns

### 🟢 Phase 1: Dynamic Candidate Onboarding & Scope Setup
* **Target Role & Seniority Selector:** Custom options for Software Engineer, UI/UX Designer, Data Analyst, AI/ML Engineer across Junior, Mid-Level, and Senior tiers.
* **Context-Aware Customization:** Option to input specific Job Descriptions (JD) and Resume summaries for tailored questions.
* **4-Card Round Types:** Supports General HR/Behavioral (STAR method), Technical Core, Coding/DSA, and System Design rounds.

### 🟢 Phase 2: Interactive AI Interview Workspace
* **Adaptive Question Generator:** Powered by Gemini 1.5 Flash API for real-time dynamic questioning and context-based follow-ups.
* **Per-Question Live Countdown Timer:** Integrated 2-minute circular countdown timer widget (`QuestionTimer.tsx`) with automatic response submission.
* **Dual Input Mode:** Live Web Speech API voice transcription (`VoiceRecorder.tsx`) paired with a manual text editing area.
* **Speech Synthesis (Voice Questions):** Built-in browser text-to-speech engine (`window.speechSynthesis`) to deliver natural human interviewer voice interactions.

### 🟢 Phase 3: AI Evaluation & Deep Feedback Engine
* **Multi-Metric Scoring:** Detailed breakdown out of 100 covering Technical Accuracy, Communication Clarity, and Candidate Confidence.
* **Gap Analysis & Skill Roadmap:** Automated identification of missing technical terms and weak areas rendered via `SkillGapRoadmap.tsx`.
* **Side-by-Side Model Answers:** Candidate responses paired with AI Ideal Answers for immediate self-evaluation.

### 🟢 Phase 4: AB Talks Ecosystem Integration
* **+50 Synergy Points Rewards:** Animated achievement banner awarded upon session completion.
* **Verifiable Job Readiness Badge:** Downloadable and shareable web card (`ShareableBadge.tsx`) showcasing job-readiness scores (e.g., "88% Job Ready for SDE-1").
* **Targeted Learning Tracks:** Direct course and skill recommendations linked within the feedback report.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js 16 (App Router) + React 19
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Lucide React Icons
* **AI Engine:** Google Gemini 1.5 Flash API
* **Speech Services:** Web Speech API (STT & TTS)
* **State Management:** SessionStorage Context Persistence

---

## 📂 Repository Structure

```text
├── public/                     # Static assets and media
├── src/
│   ├── app/
│   │   ├── api/                # Gemini API routes (question, evaluate, report)
│   │   ├── interview/          # Workspace & Setup pages
│   │   ├── report/             # Final Scorecard & Analytics pages
│   │   ├── globals.css         # Global styles & Tailwind layers
│   │   └── page.tsx            # Landing Page
│   ├── components/
│   │   ├── ui/                 # Reusable UI elements (Navbar, Footer, Timer, VoiceRecorder)
│   │   ├── ShareableBadge.tsx   # Job Readiness Badge component
│   │   └── SkillGapRoadmap.tsx # Weakness Analysis component
│   └── lib/                    # AI Clients & Helper utilities
