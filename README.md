# 🌾 Crop Disease Detection App

A production-ready, farmer-friendly web application for detecting crop diseases using AI. The project is split into separate **frontend** and **backend** folders.

## 📁 Project Structure

```
crop-disease-app/
├── frontend/               # React + Vite web app
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                # Flask API + ML model
│   ├── app.py
│   ├── requirements.txt
│   ├── train.py
│   └── crop_model.keras
├── README.md
└── package.json            # Root scripts to run frontend/backend
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Python 3.9+ with pip
- Backend API running at `http://localhost:5001` (default)

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app opens at `http://localhost:3000`.

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # optional, for AI chatbot
python3 app.py
```

The API runs at `http://localhost:5001`.

### Run from project root

```bash
npm run dev:frontend   # start React app
npm run dev:backend    # start Flask API
```

## 🔌 API Integration

Set the frontend API URL in `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5001
```

Main endpoints: `POST /predict`, `POST /login`, `POST /signup`, `GET /history`.

## 📄 More Documentation

- `QUICKSTART.md` — quick setup guide
- `BACKEND_GUIDE.md` — backend API details
- `DEVELOPMENT.md` — development notes
- `DEPLOYMENT.md` — deployment guide

---

**Made with ❤️ for farmers**
