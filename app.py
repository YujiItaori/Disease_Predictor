from flask import Flask, render_template, request, jsonify
import pickle
import os

app = Flask(__name__)

# Paths for different models and their artifacts
MODEL_PATHS = {
    'old': {
        'model': 'Training/old/model.pkl',
        'symptoms': 'Training/old/symptoms.pkl',
        'label_encoder': 'Training/old/label_encoder.pkl'
    },
    'new': {
        'model': 'Training/new/model.pkl',
        'symptoms': 'Training/new/symptoms.pkl',
        'label_encoder': 'Training/new/label_encoder.pkl'
    }
}

def load_artifacts(model_key):
    """Load model, symptoms, and label encoder for specified model key."""
    paths = MODEL_PATHS.get(model_key, MODEL_PATHS['old'])
    try:
        with open(paths['model'], 'rb') as f:
            model = pickle.load(f)
        with open(paths['symptoms'], 'rb') as f:
            symptom_list = pickle.load(f)
        with open(paths['label_encoder'], 'rb') as f:
            label_encoder = pickle.load(f)
    except Exception as e:
        print(f"Error loading artifacts for {model_key}: {e}")
        model, symptom_list, label_encoder = None, [], None
    return model, symptom_list, label_encoder

@app.route('/', methods=['GET'])
def index():
    # Default model artifacts for initial page load
    _, symptom_list, _ = load_artifacts('old')
    return render_template('index.html', symptom_list=symptom_list)

@app.route('/symptoms', methods=['POST'])
def symptoms():
    # Return symptoms list for selected model dynamically
    data = request.get_json()
    model_key = data.get('model', 'old')
    _, symptom_list, _ = load_artifacts(model_key)
    return jsonify({'symptoms': symptom_list})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    selected_symptoms = data.get('symptoms', [])
    model_key = data.get('model', 'old')

    model, symptom_list, label_encoder = load_artifacts(model_key)
    if model is None or label_encoder is None:
        return jsonify({'disease': 'Model not loaded properly'})

    input_vector = [1 if symptom in selected_symptoms else 0 for symptom in symptom_list]

    try:
        pred_label = model.predict([input_vector])[0]
        disease = label_encoder.inverse_transform([pred_label])
        return jsonify({'disease': str(disease)})
    except Exception as e:
        return jsonify({'disease': f'Prediction error: {e}'})

if __name__ == '__main__':
    app.run(debug=True)
