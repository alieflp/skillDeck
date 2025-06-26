# SkillDeck

SkillDeck is a fullstack platform for showcasing personal or team skills and projects. 
This app allows users to register, log in, and manage their own project portfolio via a dashboard.

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 🧭 Routing to Dashboard for project input
- 🧩 Basic UI structure (no styling yet)
- ⚙️ Planned: Tailwind CSS integration for styling

## 📁 Project Structure

SkillDeck/
- backend/ # Express.js REST API
- frontend/ # React frontend
- README.md

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Backend:** Express.js + Node.js
- **Database:** MySQL
- **Styling:** Tailwind CSS (coming soon)

## 📦 Getting Started

### 🔧 Backend Setup
cd backend
npm install
npm run dev
Make sure to configure your .env file with DB and port settings
npx sequelize-cli db:migrate

🎨 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev

Tailwind integration is in progress.

🧪 Future Plans
Tailwind CSS integration
Project CRUD in dashboard
Image/file uploads
