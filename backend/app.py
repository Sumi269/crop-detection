# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

from utils import predict_image

app = Flask(__name__)
CORS(app)

# TEST ROUTE
@app.route("/")
def home():
    return "Crop Detection API Running"

# 🔥 MAIN PREDICT ROUTE
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    image = Image.open(io.BytesIO(file.read())).convert("RGB")

    result = predict_image(image)

    return jsonify(result)

# RUN SERVER
if __name__ == "__main__":
    app.run(debug=True)