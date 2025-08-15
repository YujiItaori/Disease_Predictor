# 🩺 Disease Predictor Web App

An AI-powered web application that predicts the most probable disease based on user-input symptoms. Combines classic machine learning with a modern Flask web interface, allowing users to select, type, or speak symptoms for real-time disease diagnosis and insight.

## ✨ Features

- **Smart Symptom Selection**: Choose symptoms from a curated list, type custom symptoms, or use voice input.
- **Advanced Machine Learning**: Random Forest-based classification powered by real medical symptom/disease datasets.
- **Interactive Web Interface**: Built with Flask and JavaScript for seamless, user-friendly prediction.
- **Voice Recognition**: Uses browser's speech API to add symptoms via microphone.
- **Automatic Model Loading**: Trained model and vocabularies are auto-loaded for rapid prediction.
- **Customizable Dataset**: Easily use your own symptom/disease CSV files for retraining.

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
2. **Train the model and save artifacts**
    - Run `training.ipynb` or your training script to generate model files in `Training/`
3. **Start the web app**
    ```bash
    python app.py
    ```

## 📁 Project Structure

```
Sympton_Disease/
├── app.py                      # Flask backend
├── templates/
│   └── index.html              # Main UI template
├── Static/
│   ├── style.css               # CSS styling (may be inlined)
│   └── script.js               # Auxiliary frontend JS (optional)
├── Training/
│   ├── DiseaseAndSymptoms.csv  # Main dataset
│   ├── model.pkl               # Trained classifier
│   ├── symptoms.pkl            # Symptom vocabulary
│   └── label_encoder.pkl       # Encoder for disease labels
├── requirements.txt
├── README.md                   # This file
└── ...                         # Other scripts/data
```

## 🚀 Usage

### User Workflow

1. **Select or type symptoms** in the web interface (checkbox, text, or microphone).
2. **Submit for prediction** to instantly receive the most likely disease.
3. **Review suggestions** and use for triage, further investigation, or education.

### Example

```text
Symptoms: ['skin rash', 'itching', 'fever']
Predicted Disease: Measles
```

## 🔧 Technical Details

### Core Components

- **Flask**: Backend API and page serving
- **scikit-learn**: Model training and prediction
- **pandas/numpy**: Data formatting and preprocessing
- **Web Speech API**: Voice-to-text for symptom entry
- **HTML/CSS/JS**: Responsive and interactive frontend

### ML Pipeline

1. **Preprocessing**: Convert symptom text to binary feature vectors
2. **Model**: Random Forest or Decision Tree classifier
3. **Training**: Trained offline via Jupyter notebook on curated CSV
4. **Prediction**: Real-time, via Flask endpoint, given user symptoms

## 🎨 Advanced Configuration

- **Add your own dataset**: Replace `DiseaseAndSymptoms.csv` with your medical data.
- **Retrain model**: Modify `training.ipynb` for custom features, algorithms, or symptom vocab.
- **Improve prediction**: Experiment with model types (xgboost, SVM), symptom NLP, etc.

## 🚀 Future Enhancements

- [ ] **Multiple Disease Predictions**: Suggest top-k possible diseases.
- [ ] **Severity Estimation**: Provide severity scores for predicted diseases.
- [ ] **Symptom Suggestions**: Auto-complete symptom input with fuzzy matching/NLP.
- [ ] **Medical Advice Integration**: Link predictions with reliable health resources.
- [ ] **Multi-language Support**: Add UI and model support for additional languages.
- [ ] **Image Upload**: Enable image-based symptom detection (e.g., rashes, wounds).
- [ ] **User Analytics**: Store history for repeat users (privacy first).
- [ ] **Mobile Compatibility**: Optimize UI for mobile browsers and native apps.
- [ ] **Deployment**: One-click Docker/image for cloud deployment.
- [ ] **API Access**: RESTful endpoints for integration with other systems.

## 📈 Performance

- **Prediction Speed**: <0.5 sec per query
- **Supported Browsers**: Chrome, Edge, Firefox (speech: Chrome/Edge optimal)
- **Model Size**: <5MB (default RF model)

## 🏭 Potential Industry Applications

- **Hospitals/Clinics**: Triage and quick decision support
- **Telemedicine**: Remote disease pre-screening
- **Education**: Interactive demos for medical students
- **Pharma/Insurance**: Patient symptom analytics

## 🔍 Troubleshooting

- **Prediction seems inaccurate?**
    - Retrain model with more diverse/clean data
    - Add more features (age, gender, etc.)
- **Speech feature not working?**
    - Use Chrome or Edge, check browser permissions
- **Model not loading?**
    - Check that `.pkl` files are in the correct `Training/` directory

## 📝 License

MIT License – See [LICENSE](LICENSE) for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Add enhancements or fix bugs
4. Submit a pull request with clear description

## 📞 Support

For issues, feature requests, or questions:
- Submit [GitHub Issues](https://github.com/YujiItaori/Disease_Predictor/issues)
- [Contact via GitHub](https://github.com/YujiItaori)

## 🙏 Acknowledgments

- scikit-learn, pandas, Flask communities
- Open medical datasets and health tech research
- Open source contributors

***

**Empowering fast, smart disease prediction for everyone. 🩺🤖**
***

⭐ Star this repository if you find it helpful!
"To keep the body in good health is a duty… otherwise we shall not be able to keep our mind strong and clear."
— Buddha
***

<img width="1919" height="1077" alt="Screenshot 2025-08-15 132438" src="https://github.com/user-attachments/assets/032444ba-8ffd-41ea-8b01-50ab1160bdbb" />
<img width="1919" height="1079" alt="Screenshot 2025-08-15 132505" src="https://github.com/user-attachments/assets/3cc68cb8-2746-42a5-b7c2-ffce2d78ca30" />
