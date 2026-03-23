from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# ===============================
# Load trained model
# ===============================

model = pickle.load(open("model/svc.pkl", "rb"))
encoder = pickle.load(open("model/encoder.pkl", "rb"))

# Get feature names used during training
symptoms = model.feature_names_in_.tolist()

# ===============================
# Load recommendation datasets
# ===============================

description_df = pd.read_csv(r"D:\Medicine_reccommendation\Datasets\description.csv")
medications_df = pd.read_csv(r"D:\Medicine_reccommendation\Datasets\medications.csv")
diets_df = pd.read_csv(r"D:\Medicine_reccommendation\Datasets\diets.csv")
precautions_df = pd.read_csv(r"D:\Medicine_reccommendation\Datasets\precautions_df.csv")
workout_df = pd.read_csv(r"D:\Medicine_reccommendation\Datasets\workout_df.csv")

# ===============================
# Home route
# ===============================

@app.route("/")
def home():
    return "Medical API Running Successfully"

# ===============================
# Return all symptoms (React dropdown)
# ===============================

@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    return jsonify(symptoms)

# ===============================
# Prediction route
# ===============================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    user_symptoms = data["symptoms"]

    # Create input vector with correct size
    input_vector = np.zeros(len(symptoms))

    for symptom in user_symptoms:
        if symptom in symptoms:
            input_vector[symptoms.index(symptom)] = 1

    # Convert to dataframe with correct feature names
    input_df = pd.DataFrame([input_vector], columns=symptoms)

    # Predict disease
    prediction = model.predict(input_df)

    # Convert numeric prediction back to disease name
    disease = encoder.inverse_transform(prediction)[0]

    # ===============================
    # Get recommendations
    # ===============================

    description = description_df[description_df['Disease'] == disease]['Description'].values
    medications = medications_df[medications_df['Disease'] == disease]['Medication'].values
    diet = diets_df[diets_df['Disease'] == disease]['Diet'].values
    precautions = precautions_df[precautions_df['Disease'] == disease].iloc[:,1:].values.flatten()
    workout = workout_df[workout_df['disease'] == disease]['workout'].values

    return jsonify({
        "disease": disease,
        "description": description.tolist(),
        "medications": medications.tolist(),
        "diet": diet.tolist(),
        "precautions": precautions.tolist(),
        "workout": workout.tolist()
    })

# ===============================
# Run server
# ===============================

if __name__ == "__main__":
    app.run(debug=True)