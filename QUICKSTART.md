# 🚀 Quick Start Guide

Get the Crop Disease Detection app running in 5 minutes!

## Prerequisites
- Node.js 16+ installed
- A code editor (VS Code recommended)

## Steps

### 1. Navigate to Project
```bash
cd crop-disease-app
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Configure API (Optional for Testing)
```bash
cp .env.example .env
```
Edit `frontend/.env` if your backend runs on a different URL.

### 4. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## What You'll See

### Home Page
- App title and description
- "Scan Crop Now" button
- Feature cards explaining the 3-step process

### Test the Flow
1. Click "Scan Crop Now"
2. Upload any image or use camera
3. Click "Detect Disease"
4. Without a backend, you'll see an error (expected!)

## Setting Up Backend (Optional)

The Flask API lives in `backend/`. For full functionality:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

See `BACKEND_GUIDE.md` for more API details.

### Quick Mock Backend (Python)
```python
# mock_server.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    return jsonify({
        'disease': 'Leaf Blight',
        'description': 'A fungal disease causing brown spots',
        'treatment': 'Apply fungicide every 7-10 days',
        'confidence': 0.87
    })

if __name__ == '__main__':
    app.run(port=5000)
```

Run it:
```bash
pip install flask flask-cors
python mock_server.py
```

Now the full app flow will work!

## Project Structure Overview

```
crop-disease-app/
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main application pages
│   │   └── services/     # API, storage, voice services
│   └── package.json
├── backend/
│   ├── app.py            # Flask API server
│   └── requirements.txt
└── README.md
```

## Available Scripts

From `frontend/`:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

From project root:
- `npm run dev:frontend` - Start frontend
- `npm run dev:backend` - Start backend API

## Key Features to Test

✅ Image upload from gallery
✅ Camera capture (mobile only)
✅ Image preview with clear option
✅ Loading states
✅ Error handling
✅ Result display with confidence
✅ Voice output (click speaker icon)
✅ Detection history (last 5 scans)
✅ Responsive design (test on mobile)

## Mobile Testing

### On Same Network
1. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access from mobile: `http://YOUR_IP:3000`

### Using ngrok
```bash
npx ngrok http 3000
```
Access the ngrok URL from any device!

## Common Issues

### Port Already in Use
Change port in `vite.config.js`:
```javascript
server: {
  port: 3001  // Use different port
}
```

### Camera Not Working
- Must use HTTPS in production
- Works on localhost for development
- Check browser permissions

### API Connection Failed
- Ensure backend is running on port 5001
- Check CORS is enabled on backend
- Verify `frontend/.env` has correct API URL

## Next Steps

1. ✅ Test the app thoroughly
2. 📖 Read `README.md` for detailed docs
3. 🚀 Check `DEPLOYMENT.md` for hosting
4. 🔧 See `DEVELOPMENT.md` for customization
5. 🔌 Read `BACKEND_GUIDE.md` for API setup

## Need Help?

- Check the documentation files
- Look at code comments
- All components are well-documented
- Services have clear JSDoc comments

---

**Happy Coding! 🌾**

Made with ❤️ for farmers
