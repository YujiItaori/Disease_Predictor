Here's the updated README to reflect your current project setup with support for two models (old and new) and related workflow:

***

# 🩺 Disease Predictor Web App

An AI-powered web application that predicts the most probable disease based on user-input symptoms. Combines classic machine learning with a modern Flask web interface, allowing users to select, type, or speak symptoms for real-time disease diagnosis and insight.

## ✨ Features

- **Smart Symptom Selection**: Choose symptoms from a curated list, type custom symptoms, or use voice input.
- **Advanced Machine Learning**: Random Forest-based classification powered by two medical symptom/disease datasets (old and new).
- **Multiple Model Support**: Switch interactively between original and new dataset models via UI dropdown.
- **Interactive Web Interface**: Built with Flask and JavaScript for seamless, user-friendly prediction.
- **Voice Recognition**: Uses browser's speech API to add symptoms via microphone.
- **Automatic Model Loading**: Trained models and vocabularies are auto-loaded for rapid prediction.
- **Customizable Dataset**: Easily replace datasets and retrain models using provided training notebooks.

## 🎯 Supported Use Cases

| Use Case                     | Flow                                                            |
|------------------------------|-----------------------------------------------------------------|
| 🧑⚕️ Pre-screening           | Enter symptoms to get probable diseases for further investigation|
| 🏥 Patient Triage            | Rapid suggestion for medical staff or self-diagnosis            |
| 📝 Health Education          | Explore disease possibilities based on clinical presentations   |
| 🤖 AI Demonstration          | Show ML, NLP, and browser-tech integration for interviews/fairs |

## 🛠️ Installation

### Prerequisites

- Python 3.7+
- Flask
- scikit-learn
- pandas
- numpy

### Setup

1. **Install required dependencies**

```bash
pip install -r requirements.txt
```

2. **Train the models and save artifacts**

- Run training notebooks/scripts for both your old and new datasets to generate model files in

```
Training/old/
Training/new/
```

📁 Dataset Information and Usage
Due to the large size of the main dataset file "Disease and symptoms dataset.csv" (~182 MB), it is not included in this repository to keep the repo lightweight and manageable.

The dataset is publicly available for download at Mendeley Data:
https://data.mendeley.com/datasets/2cxccsxydc/1

Why not include the dataset directly?
GitHub enforces a hard file size limit of 100 MB per file.

Large files slow down cloning, reduce repository performance, and bloat repository size.

Best practice is to keep large datasets separate and reference them externally.

This approach avoids repository size bloat and makes collaboration easier.

How to use the dataset?
Download the dataset manually from the provided Mendeley link.

Place the CSV file in the Training/ directory locally.

Run the training notebook (training.ipynb) to generate the model and related artifacts.

3. **Start the web app**

```bash
python app.py
```

## 📁 Project Structure

```
Sympton_Disease/
├── app.py                      # Flask backend with multiple model support
├── templates/
│   └── index.html              # Main UI template with model selector
├── static/
│   ├── style.css               # CSS styling
│   └── script.js               # Frontend JavaScript
├── Training/
│   ├── old/
│   │   ├── model.pkl           # Old model pickle file
│   │   ├── symptoms.pkl        # Old symptom vocabulary pickle
│   │   └── label_encoder.pkl   # Old label encoder pickle
│   ├── new/
│   │   ├── model.pkl           # New model pickle file
│   │   ├── symptoms.pkl        # New symptom vocabulary pickle
│   │   └── label_encoder.pkl   # New label encoder pickle
│   ├── Disease and symptoms dataset.csv  # New dataset CSV file
│   ├── DiseaseAndSymptoms.csv            # Another dataset CSV file
│   ├── training.ipynb                    # Training notebook for old model
│   └── disease.ipynb                     # Training notebook for new model
├── requirements.txt
├── README.md                   # This README file
```

## 🚀 Usage

### User Workflow

1. **Select dataset/model** from dropdown (Original or New).
2. **Select or add symptoms** in the web interface (checkbox, text, or microphone).
3. **Submit for prediction** to get the probable disease.
4. **Review suggestions** for triage, investigation, or education.

### Example

```text
Symptoms: ['skin rash', 'itching', 'fever']
Model: New Dataset
Predicted Disease: Measles
```

## 🔧 Technical Details

### Core Components

- **Flask**: Backend API and frontend serving.
- **scikit-learn**: Training and prediction with Random Forest.
- **pandas / numpy**: Data handling.
- **Web Speech API**: Voice input.
- **HTML/CSS/JS**: Responsive frontend with dynamic symptom lists.

### ML Pipeline

1. **Preprocessing**: Binary symptom vectors based on selected dataset vocabulary.
2. **Model**: Separate Random Forest models trained on old and new datasets.
3. **Training**: Offline via training notebooks.
4. **Prediction**: Real-time through Flask API, model selected by user.

## 🎨 Advanced Configuration

- Switch datasets/models on the UI dropdown.
- Replace dataset CSVs and retrain models using provided notebooks.
- Experiment with models (XGBoost, neural nets) or extend symptom NLP.

## 🔍 Troubleshooting

- Large model/datapath issues? Keep large files out of Git or use Git LFS.
- Speech input requires Chrome or Edge with microphone permissions.
- Model loading errors? Verify `.pkl` files in correct Training subfolders.

## 📝 License

MIT License — See LICENSE for details.

## 👥 Contributing

1. Fork the repo  
2. Create feature branch  
3. Make your changes  
4. Create a pull request

## 📞 Support

For issues or suggestions:  
- Open [GitHub Issues](https://github.com/YujiItaori/Disease_Predictor/issues)  
- Contact [YujiItaori](https://github.com/YujiItaori)

***

**Empowering fast, smart disease prediction for everyone. 🩺🤖**

⭐ Star this repo if it helps!  
*"To keep the body in good health is a duty… otherwise we shall not be able to keep our mind strong and clear."* — Buddha

***

Let me know if you want me to help format or extend this further!
