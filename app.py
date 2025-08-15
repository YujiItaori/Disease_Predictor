from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

MODEL_PATH = 'Training/model.pkl'
SYMPTOMS_PATH = 'Training/symptoms.pkl'
LABEL_ENCODER_PATH = 'Training/label_encoder.pkl'

try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    with open(SYMPTOMS_PATH, 'rb') as f:
        symptom_list = pickle.load(f)
    with open(LABEL_ENCODER_PATH, 'rb') as f:
        label_encoder = pickle.load(f)
except Exception as e:
    model = None
    symptom_list = []
    label_encoder = None

@app.route('/')
def index():
    return render_template('index.html', symptom_list=symptom_list)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    selected_symptoms = data.get('symptoms', [])
    input_vector = [1 if symptom in selected_symptoms else 0 for symptom in symptom_list]
    pred_label = model.predict([input_vector])[0]
    disease = label_encoder.inverse_transform([pred_label])
    return jsonify({'disease': str(disease)})


if __name__ == '__main__':
    app.run(debug=True)
