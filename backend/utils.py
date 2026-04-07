# utils.py

import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image

# LOAD MODEL ONCE
model = load_model("model/model.html")

# YOUR CLASS NAMES (UPDATE BASED ON DATASET)
class_names = [
    "Corn_(maize)___healthy",
    "Tomato___Late_blight",
    "Tomato___Early_blight"
]

def predict_image(image):
    img = image.resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    predictions = model.predict(img)[0]

    top_indices = predictions.argsort()[-3:][::-1]

    top3 = []
    for i in top_indices:
        top3.append({
            "label": class_names[i],
            "confidence": round(float(predictions[i] * 100), 2)
        })

    best_index = np.argmax(predictions)
    best_label = class_names[best_index]

    status = "HEALTHY" if "healthy" in best_label.lower() else "DISEASED"

    return {
        "crop": best_label.split("___")[0],
        "status": status,
        "confidence": round(float(predictions[best_index] * 100), 2),
        "top3": top3
    }