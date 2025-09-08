## 🚀 Repo Analyzer

A full-stack GitHub visualization tool that fetches repository data, renders interactive charts, and generates AI-powered insights using Google Gemini. Built with React, Express, and Vite, it features a sleek glassmorphism UI, dark mode toggle, and PWA support.

---


## 🧰 Tech Stack

| Layer       | Tech Used                                       |
|------------|--------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS, Chart.js, Recharts |
| Backend    | Express.js, Google Generative AI (Gemini)        |
| API        | GitHub REST API                                  |
| PWA        | Vite Plugin PWA + Workbox                        |
| Dev Tools  | ESLint, dotenv, axios                            |
----------------------------------------------------------------|
---


## 📦 Features

- 🔍 Fetch GitHub repo metadata (stars, forks, issues, watchers)
- 📊 Visualize languages, commit activity, and top contributors
- 🤖 Generate AI insights via Gemini 1.5 Flash
- 🌙 Toggle between light and dark mode
- 🎨 Glassmorphism UI with gradient branding
- 📱 Offline-ready with PWA caching

---

## 📁 Project Structure

repo-analyser/
|___dist
|___node_modules
|___public/
|    |__icons/
|    |    |__icon-192.png
|    |    |__icon-512.png
|    |
|    |__manifest.json
|    |__offline.html
|    |__sw.js
|    |__vite.svg
|
|
|___src/
|    |
|    |__assets
|    |
|    |__components/
|    |  |__AiInsights.jsx
|    |  |__CommitsChart.jsx
|    |  |__ContributorsChart.jsx
|    |  |__LanguagesChart.jsx
|    |  
|    |
|    |__images
|    |  |
|    |  |__desktop_screenshot.png
|    |  |
|    |  |__mobile_screenshot.png
|    |  
|    |__App.css
|    |
|    |__App.jsx
|    |
|    |__index.ccss
|    |__main.css
|
|___.env
|
|___.gitignore
|
|___eslint.config.js
|___package.json
|___packafe-lock.json
|___index.html
|___README.md
|___server.js
|___vite.config.js


---


## Setup Instructions

1.Clone the repo
    git clone https://github.com/imSupratim/GitHub_Repo_Analyzer
    cd repo-analyser

2.Install dependencies
    npm install

3.Create .env file
    VITE_GEMINI_API_KEY=your_google_gemini_api_key

4.Start backend
    node server.js

5.Start frontend
    npm run dev

---

## AI Insight Flow
- Frontend sends repo metadata to /api/generate
- Express backend invokes Gemini 1.5 Flash with a structured prompt
- Insight is returned and rendered in a styled card
----

## Credits
Built with ❤️ by Supratim Mandal— blending backend logic, frontend finesse, and AI magic into one elegant tool
