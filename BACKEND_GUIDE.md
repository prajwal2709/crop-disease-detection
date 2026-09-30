# Backend API Implementation Guide

This document provides examples for implementing the backend API that the Crop Disease Detection frontend expects.

## API Specification

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. POST /predict

Accepts an image and returns disease prediction.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with field name "file"

**Response:**
```json
{
  "disease": "Leaf Blight",
  "description": "A fungal disease that causes brown spots on leaves",
  "treatment": "Apply copper-based fungicide and remove affected leaves",
  "confidence": 0.92
}
```

---

## Python Flask Example

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max file size

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

@app.route('/predict', methods=['POST'])
def predict():
    # Check if file is present
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400
    
    # Save file
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    # TODO: Replace with your actual ML model prediction
    # result = your_ml_model.predict(filepath)
    
    # Mock response for demonstration
    result = {
        'disease': 'Leaf Blight',
        'description': 'This is a fungal disease that causes brown spots on leaves. It spreads in humid conditions.',
        'treatment': 'Spray copper-based fungicide every 7-10 days. Remove and destroy affected leaves. Improve air circulation.',
        'confidence': 0.87
    }
    
    # Clean up uploaded file (optional)
    os.remove(filepath)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```

**Install dependencies:**
```bash
pip install flask flask-cors
```

**Run:**
```bash
python app.py
```

---

## Node.js Express Example

```javascript
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type'));
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Prediction endpoint
app.post('/predict', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // TODO: Replace with your actual ML model prediction
    // const result = await yourMLModel.predict(req.file.path);
    
    // Mock response for demonstration
    const result = {
      disease: 'Leaf Blight',
      description: 'This is a fungal disease that causes brown spots on leaves. It spreads in humid conditions.',
      treatment: 'Spray copper-based fungicide every 7-10 days. Remove and destroy affected leaves. Improve air circulation.',
      confidence: 0.87
    };

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json(result);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ 
      error: 'Failed to process image',
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Server error',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Install dependencies:**
```bash
npm install express cors multer
```

**Run:**
```bash
node server.js
```

---

## Integrating ML Model

### TensorFlow.js Example

```javascript
const tf = require('@tensorflow/tfjs-node');

let model;

// Load model at startup
async function loadModel() {
  model = await tf.loadLayersModel('file://./model/model.json');
  console.log('Model loaded successfully');
}

async function predictDisease(imagePath) {
  // Load and preprocess image
  const imageBuffer = fs.readFileSync(imagePath);
  const tfimage = tf.node.decodeImage(imageBuffer);
  
  // Resize and normalize
  const resized = tf.image.resizeBilinear(tfimage, [224, 224]);
  const normalized = resized.div(255.0);
  const batched = normalized.expandDims(0);
  
  // Predict
  const predictions = await model.predict(batched).data();
  
  // Process predictions
  const diseaseClasses = ['Healthy', 'Leaf Blight', 'Rust', 'Powdery Mildew'];
  const maxIndex = predictions.indexOf(Math.max(...predictions));
  
  return {
    disease: diseaseClasses[maxIndex],
    confidence: predictions[maxIndex],
    description: getDescription(diseaseClasses[maxIndex]),
    treatment: getTreatment(diseaseClasses[maxIndex])
  };
}
```

### PyTorch Example

```python
import torch
from torchvision import transforms
from PIL import Image

# Load model
model = torch.load('model.pth')
model.eval()

def predict_disease(image_path):
    # Preprocess image
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    image = Image.open(image_path)
    image = transform(image).unsqueeze(0)
    
    # Predict
    with torch.no_grad():
        output = model(image)
        probabilities = torch.nn.functional.softmax(output, dim=1)
        confidence, predicted = torch.max(probabilities, 1)
    
    disease_classes = ['Healthy', 'Leaf Blight', 'Rust', 'Powdery Mildew']
    
    return {
        'disease': disease_classes[predicted.item()],
        'confidence': confidence.item(),
        'description': get_description(disease_classes[predicted.item()]),
        'treatment': get_treatment(disease_classes[predicted.item()])
    }
```

---

## Disease Database Example

```python
DISEASE_INFO = {
    'Healthy': {
        'description': 'Your crop appears to be healthy with no signs of disease.',
        'treatment': None
    },
    'Leaf Blight': {
        'description': 'A fungal disease causing brown spots on leaves that can spread rapidly in humid conditions.',
        'treatment': 'Apply copper-based fungicide every 7-10 days. Remove affected leaves. Improve air circulation around plants.'
    },
    'Rust': {
        'description': 'Fungal disease identified by orange or rust-colored pustules on leaf surfaces.',
        'treatment': 'Use sulfur-based fungicides. Remove infected leaves. Avoid overhead watering.'
    },
    'Powdery Mildew': {
        'description': 'White powdery fungal growth on leaves and stems, common in warm, dry conditions.',
        'treatment': 'Spray with neem oil or potassium bicarbonate solution. Ensure proper spacing between plants.'
    }
}

def get_description(disease):
    return DISEASE_INFO.get(disease, {}).get('description', 'Unknown disease')

def get_treatment(disease):
    return DISEASE_INFO.get(disease, {}).get('treatment', 'Consult agricultural expert')
```

---

## Testing the API

### Using cURL

```bash
curl -X POST http://localhost:5000/predict \
  -F "file=@/path/to/crop_image.jpg"
```

### Using Postman

1. Create new POST request to `http://localhost:5000/predict`
2. Go to Body tab
3. Select "form-data"
4. Add key "file" with type "File"
5. Choose image file
6. Send request

### Using Python

```python
import requests

url = 'http://localhost:5000/predict'
files = {'file': open('crop_image.jpg', 'rb')}

response = requests.post(url, files=files)
print(response.json())
```

---

## Deployment Options

### 1. Heroku
```bash
# Create Procfile
echo "web: python app.py" > Procfile

# Deploy
heroku create crop-disease-api
git push heroku main
```

### 2. AWS Lambda + API Gateway
Use serverless framework or AWS SAM for deployment.

### 3. Google Cloud Run
```bash
gcloud run deploy crop-disease-api \
  --source . \
  --platform managed \
  --region us-central1
```

### 4. DigitalOcean App Platform
Connect your GitHub repository and follow deployment wizard.

---

## Security Considerations

1. **File Validation:**
   - Validate file types
   - Check file sizes
   - Scan for malware

2. **Rate Limiting:**
   ```python
   from flask_limiter import Limiter
   
   limiter = Limiter(app, key_func=get_remote_address)
   
   @app.route('/predict', methods=['POST'])
   @limiter.limit("10 per minute")
   def predict():
       # ...
   ```

3. **HTTPS:**
   - Use SSL/TLS in production
   - Required for camera access on mobile

4. **Authentication (Optional):**
   - Add API keys
   - Implement OAuth
   - Use JWT tokens

---

## Monitoring

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    logger.info(f'Prediction request from {request.remote_addr}')
    # ...
    logger.info(f'Prediction result: {result["disease"]}')
```

---

For questions or issues, please refer to the main README or create an issue in the repository.
