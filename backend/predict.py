import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image

# Load model
model = tf.keras.models.load_model("tomato_model.h5")

# Class names (IMPORTANT — order must match training folders)
class_names = [
    "Tomato_Early_Blight",
    "Tomato_Late_Blight",
    "Tomato_Healthy"
]

# Load test image
img_path = "test.jpg"  # put a test image in project folder

img = image.load_img(img_path, target_size=(224,224))
img_array = image.img_to_array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

# Predict
predictions = model.predict(img_array)
class_index = np.argmax(predictions)
confidence = np.max(predictions) * 100

print("Prediction:", class_names[class_index])
print("Confidence:", round(confidence, 2), "%")
