# 🚀 AI Prompt Log — Team The Aarambhies

**Project:** AI Interview & Talent Evaluation Platform  
**Event:** AB Talks ViCodathon 2026  
**Repository:** Public  

---

## 📌 Usage Rules for Team
1. Har major feature, UI component, ya API route jo AI (Cursor/Claude/Gemini) se generate ho, use niche table me add karte rahein.
2. Single bulk commit mat karein. Har feature ke baad code + `prompts.md` dono ko commit-push karein.

---

## 📝 Chronological Prompt History

| Log # | Component / File | Model / Tool Used | Exact Prompt Used | Result / Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **#001** | Repository & Documentation Setup (`/prompts.md`, `/README.md`) | Cursor (Claude 3.5 Sonnet) | *"Create a structured Markdown documentation setup for AB Talks ViCodathon containing project architecture, team allocation, and prompt logging templates."* | Public GitHub repository initialized with project docs, README, and prompt logging structure. |
| **#002** | Interview Setup Screen (`src/app/interview/setup/page.tsx`) | Gemini 1.5 Pro | *"Role: Senior Frontend Engineer & UI/UX Expert. Stack: Next.js 15, React, Tailwind CSS, Lucide React. Task: Build a sleek, modern, Dark-mode Glassmorphic 'Interview Setup & Configuration Screen' for our AI Mock Interview Platform inside app/interview/setup/page.tsx with job role selector, experience level, tech stack input, duration, and stress-free focus mode toggle."* | Built complete dark-mode glassmorphic setup UI with interactive state controls for role, experience, tech stack, and duration. |
## Log #003 - Interview Workspace Page Layout

## Log #004 - Scorecard and Report UI
**Prompt:** Built responsive interview evaluation scorecard layout featuring overall score meter, skill breakdown progress bars, and structured strength/weakness analysis.**Prompt:** Built dynamic interview workspace page layout with interactive timer, STAR methodology guidance box, focus mode toggle, and answer submit interface.
# AI Prompt System Architecture — The Aarambhies

## 1. Dynamic Question Generation Prompt
**Role:** Technical Interviewer  
**Input:** Role, Seniority, Optional JD, Optional Resume Text  
**Prompt:**
> "You are an expert interviewer for the role of {Role} ({Seniority} level). Based on the provided Job Description: [{JD}] and Resume Context: [{Resume}], generate 3 highly targeted technical and behavioral interview questions. Output only a JSON array of strings."

## 2. Multi-Metric Answer Evaluation Prompt
**Input:** Question, Candidate Response  
**Prompt:**
> "Analyze the candidate's answer for the question: '{Question}'. Candidate Answer: '{Answer}'. Evaluate based on: 1. Technical Accuracy (out of 100), 2. Communication Clarity (out of 100), 3. Overall Readiness Score (out of 100). Provide constructive feedback and an ideal answer snippet. Output strictly in JSON format."