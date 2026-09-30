import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

# -----------------------------
# SETTINGS
# -----------------------------
IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 20

# -----------------------------
# DATA GENERATORS
# -----------------------------
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=25,
    zoom_range=0.2,
    horizontal_flip=True,
    brightness_range=[0.8, 1.2]
)

val_datagen = ImageDataGenerator(rescale=1./255)

# -----------------------------
# LOAD TRAIN DATA
# -----------------------------
train_data = train_datagen.flow_from_directory(
    "train/",
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical"
)

# -----------------------------
# LOAD TEST DATA
# -----------------------------
val_data = val_datagen.flow_from_directory(
    "test/",
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical"
)

# -----------------------------
# LOAD PRETRAINED MODEL
# -----------------------------
base_model = MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False

# -----------------------------
# BUILD FINAL MODEL
# -----------------------------
model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(256, activation="relu"),
    layers.Dropout(0.5),
    layers.Dense(train_data.num_classes, activation="softmax")
])

# -----------------------------
# COMPILE MODEL
# -----------------------------
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# -----------------------------
# CALLBACKS
# -----------------------------
callbacks = [
    EarlyStopping(patience=5, restore_best_weights=True),
    ReduceLROnPlateau(patience=3)
]
# -----------------------------
# TRAIN MODEL
# -----------------------------
history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=EPOCHS,
    callbacks=callbacks
)

# -----------------------------
# EVALUATE MODEL
# -----------------------------
loss, accuracy = model.evaluate(val_data)

print("Test Loss:", loss)
print("Test Accuracy:", accuracy * 100, "%")

# -----------------------------
# SAVE MODEL
# -----------------------------
model.save("crop_model.keras")

print("\nTraining Complete!")
print("Model saved as crop_model.keras")