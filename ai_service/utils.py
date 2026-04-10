# utils.py

import numpy as np
import io

# We will try loading tensorflow here. If it fails or model missing, we degrade gracefully.
try:
    from tensorflow.keras.models import load_model
    model = load_model("model/model.html")
    MODEL_LOADED = True
except Exception as e:
    print("Warning: Model could not be loaded. Running with mock predictions for development.", e)
    MODEL_LOADED = False

from PIL import Image

# YOUR CLASS NAMES (UPDATE BASED ON DATASET)
class_names = [
    "Corn_(maize)___healthy",
    "Tomato___Late_blight",
    "Tomato___Early_blight",
    "Potato___Late_blight",
    "Apple___Apple_scab"
]

def predict_image(image):
    if not MODEL_LOADED:
        import random
        # Mocking predictions for frontend dev
        top_idx = random.randint(0, 2)
        best_label = class_names[top_idx]
        confidence = round(random.uniform(70.0, 99.9), 2)
        status = "HEALTHY" if "healthy" in best_label.lower() else "DISEASED"
        
        top3 = [
            {"label": best_label, "confidence": confidence},
            {"label": class_names[(top_idx + 1) % len(class_names)], "confidence": round(random.uniform(1.0, 20.0), 2)},
            {"label": class_names[(top_idx + 2) % len(class_names)], "confidence": round(random.uniform(0.1, 5.0), 2)},
        ]
        
        return {
            "crop": best_label.split("___")[0].replace("_", " "),
            "status": status,
            "confidence": confidence,
            "top3": top3,
            "full_label": best_label
        }

    # REAL PREDICTION Logic
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
        "crop": best_label.split("___")[0].replace("_", " "),
        "status": status,
        "confidence": round(float(predictions[best_index] * 100), 2),
        "top3": top3,
        "full_label": best_label
    }