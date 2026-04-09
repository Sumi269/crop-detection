# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import sqlite3
import datetime
import base64

from utils import predict_image

app = Flask(__name__)
CORS(app)

DB_PATH = 'history.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            crop TEXT,
            status TEXT,
            confidence REAL,
            image_b64 TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Initialize DB on startup
init_db()

# Mock solutions dictionary
SOLUTIONS = {
    "Late_blight": {
        "text": "Apply fungicides containing chlorothalonil or copper. Remove and destroy infected plant parts immediately.",
        "time": "Preventative application before symptoms appear, or immediately upon first sign of spots."
    },
    "Early_blight": {
        "text": "Use crop rotation. Prune lower leaves to increase airflow. Apply copper-based fungicide.",
        "time": "Apply fungicides when conditions are warm and wet. Prune consistently."
    },
    "Apple_scab": {
        "text": "Rake up and discard fallen leaves where fungi overwinter. Apply appropriate fungicides.",
        "time": "Early spring before bud break."
    },
    "healthy": {
        "text": "Your crop is healthy! Continue regular watering and fertilization schedules.",
        "time": "Ongoing preventative care."
    }
}

# TEST ROUTE
@app.route("/")
def home():
    return "Crop Detection API Running"

# MAIN PREDICT ROUTE
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    
    # Read file for predicting
    file_bytes = file.read()
    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")

    result = predict_image(image)
    
    # Convert image to base64 for history
    encoded = base64.b64encode(file_bytes).decode('utf-8')
    img_b64 = f"data:image/jpeg;base64,{encoded}"

    # Save to history DB
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        "INSERT INTO history (user, crop, status, confidence, image_b64) VALUES (?, ?, ?, ?, ?)",
        ("admin", result["full_label"], result["status"], result["confidence"], img_b64)
    )
    conn.commit()
    conn.close()

    return jsonify(result)

# SOLUTION ROUTE
@app.route("/solution", methods=["GET"])
def get_solution():
    disease_param = request.args.get("disease", "").lower()
    
    # Find matching solution
    found_key = "healthy"
    for key in SOLUTIONS.keys():
        if key.lower() in disease_param:
            found_key = key
            break
            
    solution_data = SOLUTIONS.get(found_key, SOLUTIONS["healthy"])
    return jsonify(solution_data)

# HISTORY ROUTE for Admin
@app.route("/history", methods=["GET"])
def get_history():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT id, user, crop, status, confidence, image_b64, timestamp FROM history ORDER BY timestamp DESC LIMIT 20")
    rows = c.fetchall()
    conn.close()
    
    result = []
    for r in rows:
        result.append({
            "id": r["id"],
            "user": r["user"],
            "crop": r["crop"],
            "status": r["status"],
            "confidence": r["confidence"],
            "image": r["image_b64"],
            "timestamp": r["timestamp"]
        })
    return jsonify(result)

# RUN SERVER
if __name__ == "__main__":
    app.run(debug=True, port=5000)