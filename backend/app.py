from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

import base64
import numpy as np
from PIL import Image
import tensorflow as tf

from google import genai
from dotenv import load_dotenv
import os

# =====================================================
# FLASK APP SETUP
# =====================================================

app = Flask(__name__)
CORS(app)

load_dotenv()

# =====================================================
# GEMINI CONFIGURATION
# =====================================================

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# =====================================================
# DATABASE CONFIGURATION
# =====================================================

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///predictions.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# =====================================================
# LOAD AI MODEL
# =====================================================

model = tf.keras.models.load_model("crop_model.keras")

class_names = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___healthy"
]

# =====================================================
# DATABASE MODELS
# =====================================================

class User(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    email = db.Column(
        db.String(100),
        unique=True
    )

    password = db.Column(
        db.String(100)
    )


class Detection(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    disease = db.Column(
        db.String(100)
    )

    confidence = db.Column(
        db.Float
    )

    image = db.Column(
        db.Text
    )

    timestamp = db.Column(
        db.DateTime
    )

    user_email = db.Column(
        db.String(100)
    )# -------------------- AI FEEDBACK --------------------

class AIFeedback(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_email = db.Column(
        db.String(100)
    )

    disease = db.Column(
        db.String(100)
    )

    rating = db.Column(
        db.Integer
    )

    feedback = db.Column(
        db.Text
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )
   
# LOGIN HISTORY


class LoginHistory(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    user_email = db.Column(db.String(100), nullable=False)

    login_time = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    logout_time = db.Column(
        db.DateTime,
        nullable=True
    )



# =====================================================
# CREATE DATABASE
# =====================================================

with app.app_context():
    db.create_all()

# =====================================================
# SIGNUP
# =====================================================

@app.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(email=email).first():

        return jsonify({
            "message": "User already exists"
        }), 400

    new_user = User(
        email=email,
        password=password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Signup successful"
    }), 200


# =====================================================
# LOGIN
# =====================================================

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(
        email=email,
        password=password
    ).first()

    if user:

        # Save login history
        login_record = LoginHistory(
            user_email=email
        )

        db.session.add(login_record)
        db.session.commit()

        return jsonify({
            "message": "Login successful",
            "email": email
        }), 200

    return jsonify({
        "message": "Invalid credentials"
    }), 401
# =====================================================
# PREDICT DISEASE
# =====================================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        file = request.files["file"]
        email = request.form.get("email")

        if not file:

            return jsonify({
                "error": "No image uploaded."
            }), 400

        # ---------------- IMAGE PREPROCESSING ----------------

        img = Image.open(file).convert("RGB")
        img = img.resize((224, 224))

        img_array = np.array(img)

        img_array = img_array / 255.0

        img_array = np.expand_dims(
            img_array,
            axis=0
        )

        # ---------------- MODEL PREDICTION ----------------

        prediction = model.predict(img_array)

        confidence = float(np.max(prediction)) * 100

        class_index = int(np.argmax(prediction))

        # Invalid Image Check
        if confidence < 70:
            return jsonify({
                "success": False,
                "message": "Invalid image. Please upload a clear crop leaf image.",
                "confidence": round(confidence, 2)
            })

        disease = class_names[class_index]

        # ---------------- ENCODE IMAGE ----------------

        file.seek(0)

        encoded_image = base64.b64encode(
            file.read()
        ).decode("utf-8")

        # ---------------- SAVE TO DATABASE ----------------

        detection = Detection(
            user_email=email,
            disease=disease,
            confidence=round(confidence, 2),
            image=encoded_image,
            timestamp=datetime.utcnow()
        )

        db.session.add(detection)
        db.session.commit()

        # ---------------- RESPONSE ----------------

        return jsonify({
            "success": True,
            "disease": disease,
            "confidence": round(confidence, 2),
           "image": f"data:image/jpeg;base64,{encoded_image}"
        })

    except Exception as e:

        print("Prediction Error:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# =====================================================
# HISTORY
# =====================================================

@app.route("/history", methods=["GET"])
def get_history():

    try:

        email = request.args.get("email")

        if not email:

            return jsonify({

                "error": "Email is required."

            }), 400

        records = Detection.query.filter_by(

            user_email=email

        ).order_by(

            Detection.timestamp.desc()

        ).all()

        history = []

        for record in records:

            history.append({

                "disease": record.disease,

                "confidence": record.confidence,

                "timestamp": record.timestamp.strftime("%Y-%m-%d %H:%M"),

                "image": f"data:image/jpeg;base64,{record.image}"

            })

        return jsonify(history)

    except Exception as e:

        print("History Error :", e)

        return jsonify({

            "error": "Failed to load history."

        }), 500
    # =====================================================
# AI CHAT (GEMINI)
# =====================================================



@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        message = data.get("message", "")
        disease = data.get("disease", "Unknown")
        confidence = data.get("confidence", "")
        severity = data.get("severity", "")
        language = data.get("language", "english")

        if not message.strip():
            return jsonify({
                "reply": "Please ask a question."
            })

        prompt = f"""
You are an expert agricultural scientist.

Disease Detected: {disease}
Confidence: {confidence}%
Severity: {severity}

Farmer Question:
{message}

IMPORTANT RULES:

1. Answer ONLY crop and agriculture related questions.
2. Use very simple language.
3. Keep response short and practical.
4. Always use the exact format below.
5. Do NOT write long paragraphs.
6. Use bullet points only.

FORMAT:

🌱 Disease Summary
• Explain disease in 2-3 points

⚠ Symptoms
• Symptom 1
• Symptom 2
• Symptom 3

💊 Treatment
• Recommended fungicide/pesticide
• Organic treatment if available

🛡 Prevention
• Prevention tip 1
• Prevention tip 2
• Prevention tip 3

🌾 Farmer Tips
• Practical farming tip 1
• Practical farming tip 2

Language: {language}

If language = marathi:
Reply ONLY in Marathi.

If language = english:
Reply ONLY in English.
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:

        print("❌ Gemini Error:", str(e))

        return jsonify({
            "reply": "AI service is not available right now."
        }), 500
# =====================================================
# HOME
# =====================================================

@app.route("/")
def home():

    return jsonify({

        "message": "Crop Disease Detection API Running Successfully"

    })
# -------------------- SAVE AI FEEDBACK --------------------

@app.route("/feedback", methods=["POST"])
def save_feedback():

    try:

        data = request.get_json()

        new_feedback = AIFeedback(
            user_email=data.get("user_email"),
            disease=data.get("disease"),
            rating=data.get("rating"),
            feedback=data.get("feedback")
        )

        db.session.add(new_feedback)
        db.session.commit()

        return jsonify({
            "message": "Feedback saved successfully"
        }), 200

    except Exception as e:

        print("Feedback Error:", e)

        return jsonify({
            "message": "Failed to save feedback"
        }), 500


# =====================================================
# RUN APP
# =====================================================
# -------------------- ADMIN DASHBOARD --------------------

@app.route("/admin/dashboard", methods=["GET"])
def admin_dashboard():

    try:

        total_users = User.query.count()

        total_predictions = Detection.query.count()

        total_feedback = AIFeedback.query.count()

        recent_users = User.query.order_by(User.id.desc()).limit(5).all()

        recent_predictions = Detection.query.order_by(
            Detection.id.desc()
        ).limit(5).all()

        recent_feedback = AIFeedback.query.order_by(
            AIFeedback.id.desc()
        ).limit(5).all()

        return jsonify({

            "totalUsers": total_users,

            "totalPredictions": total_predictions,

            "totalFeedback": total_feedback,

            "recentUsers": [
                {
                    "email": u.email
                }
                for u in recent_users
            ],

            "recentPredictions": [
                {
                    "user": p.user_email,
                    "disease": p.disease,
                    "confidence": p.confidence
                }
                for p in recent_predictions
            ],

            "recentFeedback": [
                {
                    "user": f.user_email,
                    "disease": f.disease,
                    "rating": f.rating,
                    "feedback": f.feedback
                }
                for f in recent_feedback
            ]

        })

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Dashboard Error"
        }), 500
if __name__ == "__main__":

    app.run(
        debug=True,
        port=5001
    )