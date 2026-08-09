# ViCodathon Project Master Documentation — `vicodathon_the_aarambhies`

---

## 1. Project Overview & Architecture

* **Project Name:** AB Talks (AI Mock Interview Platform)
* **Tech Stack:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS, Lucide React, Web Speech API
* **Primary Target:** Interactive dynamic technical interviews with live speech-to-text input and dynamic evaluation reports.

---

## 2. Component Specifications

### A. Candidate Setup Screen (`src/app/interview/setup/page.tsx`)
- **Theme:** Dark Mode (`#090D16`), Glassmorphism cards with `backdrop-blur-md` and glowing gradients.
- **Controls:** Target Job Role selector, Experience Level selector (Entry, Mid, Senior), Skill tags input, Duration selector, Focus Mode toggle.
- **Action:** Glowing "Start AI Interview" button navigating to `/interview/demo-123`.

### B. Interview Workspace Page (`src/app/interview/[id]/page.tsx`)
- **Interactive Controls:** Countdown timer, Focus Mode toggle (hides timer for calm environment), Question Card with round tags.
- **Voice Recognition:** Web Speech API (`webkitSpeechRecognition`) live voice-to-text recording into response area.
- **Guidance Box:** STAR methodology tips and communication hints panel.
- **Navigation:** Submits answer and routes to `/report/[id]`.

### C. Evaluation Scorecard Page (`src/app/report/[id]/page.tsx`)
- **Hero Section:** Overall percentage gauge badge with target role information.
- **Skill Breakdown:** Progress indicators for Technical Accuracy, Communication Clarity, and Problem Solving.
- **Actionable Feedback:** Categorized cards highlighting Strengths and Targeted Improvement Areas.

---

## 3. AI Prompt System Architecture

### Prompt 1: Dynamic Question Generation Prompt
> Act as a Senior Technical Interviewer. Analyze the candidate's Target Role, Job Description (JD), and Resume text provided below. Generate 3 distinct, highly targeted technical and behavioral interview questions tailored specifically to their experience level and the target role requirements. Return the output strictly as a valid JSON array of question strings.

### Prompt 2: Real-time Mentor Hint Prompt
> Act as a supportive technical interviewer mentor. Given the current question and candidate's partial response, provide a brief, constructive hint (max 2 sentences) without revealing the complete answer. Help them structure their thoughts efficiently.

### Prompt 3: Answer Assessment Prompt
> You are an AI Assessment Engine for Technical Interviews. Evaluate the candidate's response to the given question based on:
> 1. Technical Accuracy & Depth
> 2. Communication Clarity & Structure
> 3. Problem Solving Approach
> 
> Output Format: JSON containing `technicalScore` (0-100), `communicationScore` (0-100), `feedback` (Strengths & Areas for Improvement), `suggestedModelAnswer` (Ideal concise answer).

### Prompt 4: Executive Hiring Lead Aggregation Prompt
> You are an Executive Hiring Lead. Aggregate all question evaluation scores and responses for the interview session. Calculate the Overall Readiness Score (0-100%) and assign a Readiness Badge Level:
> - 85-100%: Job Ready (Production Ready)
> - 70-84%: Almost There (Minor Refinements)
> - Below 70%: Skill Gap Identified
> 
> Provide an overall performance summary, top 3 strengths, and key improvement roadmap.

---

## 4. Git Logs & Commit History

### Log #001: Phase 1 - Setup Page Implementation
- **Scope:** Candidate setup interface for Job Role, Tech Stack, and Difficulty selection.

### Log #002: Project Navigation
- **Scope:** Verified routing from `/interview/setup` to `/interview/[id]`.

### Log #003: Phase 2 - Workspace UI
- **Scope:** Interactive candidate interface, timer, Focus Mode, and response text area.

### Log #004: Phase 2 - Evaluation Scorecard & PR #3
- **Scope:** Performance scorecard layout with skill gap bars and strengths cards. Merged to `main`.

### Log #005: Phase 3 - Speech Recognition & Dynamic API
- **Date:** August 8, 2026
- **Branch:** `feature/phase3-voice-and-ai`
- **PR:** `feat(phase3): add voice input recognition and dynamic question API`
- **Highlights:**
  1. Integrated `webkitSpeechRecognition` hook for microphone-to-text transcription.
  2. Built Next.js App Router POST API route (`/api/generate-questions/route.ts`) for dynamic question fetching.
  3. Pushed changes to `feature/phase3-voice-and-ai` branch.

### Log #006: Phase 3 - Conflict Resolution & Full Integration
- **Date:** August 8, 2026
- **Branch:** `feature/phase3-voice-and-ai`
- **PR:** #6 (`feat(phase3): add voice input recognition and dynamic question API`)
- **Status:** Conflicts Resolved & Approved (Ready for Merge)
- **Highlights:**
  1. Implemented complete evaluation route (`/api/evaluate-answer/route.ts`) calculating dynamic scores for Technical Accuracy, Communication Clarity, and STAR Methodology.
  2. Integrated Web Speech API (`webkitSpeechRecognition`) for real-time microphone voice-to-text input in `/interview/[id]/page.tsx`.
  3. Integrated dynamic question generation backend route (`/api/generate-questions/route.ts`).
  4. Successfully resolved upstream merge conflicts with `main` branch directly via GitHub UI.

### Log #007: Voice Auto-Restart & Dynamic Streaming Fix
- **Date:** August 9, 2026
- **Branch:** `feature/pr-voice-fix`
- **PR:** `Fix: Voice Recognition Silence Auto-Restart and Real-time Streaming`
- **Highlights:**
  1. Enabled continuous speech recognition and interim results (`continuous = true`).
  2. Implemented dynamic auto-restart in `onend` callback to prevent mic disconnection during 3-5s silence pauses.
  3. Enabled real-time speech-to-text transcript streaming in the candidate response area.
  4. Merged PR #18 into `main` branch cleanly.

### Log #008: End-to-End Testing & Analytics Validation
- **Date:** August 9, 2026
- **Branch:** `main`
- **PR:** `feat(report): integrate dynamic evaluation scorecard & Chart.js`
- **Highlights:**
  1. Verified complete user flow from `/interview/setup` to `/interview/room` and `/report`.
  2. Validated Next.js App Router dynamic context passing and modal rendering on response lock.
  3. Verified Chart.js dynamic graphs, horizontal skill gap bars, and QA history rendering on `/report`.
  4. Confirmed local repository state is synced, audited, and clean (`working tree clean`).