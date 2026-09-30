import os
import shutil
import random

# -----------------------------
# SETTINGS
# -----------------------------
SOURCE_DIR = "dataset"
TRAIN_DIR = "train"
TEST_DIR = "test"
SPLIT_RATIO = 0.8  # 80% train, 20% test

# -----------------------------
# CREATE TRAIN & TEST FOLDERS
# -----------------------------
os.makedirs(TRAIN_DIR, exist_ok=True)
os.makedirs(TEST_DIR, exist_ok=True)

# -----------------------------
# SPLIT DATA
# -----------------------------
for class_name in os.listdir(SOURCE_DIR):
    class_path = os.path.join(SOURCE_DIR, class_name)

    if not os.path.isdir(class_path):
        continue

    images = os.listdir(class_path)
    random.shuffle(images)

    split_index = int(len(images) * SPLIT_RATIO)
    train_images = images[:split_index]
    test_images = images[split_index:]

    # Create class folders in train/test
    os.makedirs(os.path.join(TRAIN_DIR, class_name), exist_ok=True)
    os.makedirs(os.path.join(TEST_DIR, class_name), exist_ok=True)

    # Move files
    for image in train_images:
        shutil.copy(
            os.path.join(class_path, image),
            os.path.join(TRAIN_DIR, class_name, image)
        )

    for image in test_images:
        shutil.copy(
            os.path.join(class_path, image),
            os.path.join(TEST_DIR, class_name, image)
        )

    print(f"{class_name}: {len(train_images)} train | {len(test_images)} test")

print("\nDataset split complete ✅")
