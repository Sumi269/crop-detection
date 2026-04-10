# app.py

from flask import Flask, request, jsonify
from PIL import Image
import io

from utils import predict_image

app = Flask(__name__)

# TEST ROUTE
@app.route("/")
def home():
    return "Crop Detection Python Microservice API Running"

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

    return jsonify(result)

# RUN SERVER ON 5001 FOR NODEJS PROXY
if __name__ == "__main__":
    app.run(debug=True, port=5001)