import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

IMG_SIZE = 224
BATCH_SIZE = 32

# Load trained model
model = tf.keras.models.load_model("tomato_model.keras")

# Test data (NO validation split here)
test_datagen = ImageDataGenerator(rescale=1./255)

test_data = test_datagen.flow_from_directory(
    "test/",
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    shuffle=False
)

loss, accuracy = model.evaluate(test_data)

print("\nTotal Test Images:", test_data.samples)
print("REAL Test Accuracy:", round(accuracy * 100, 2), "%")
