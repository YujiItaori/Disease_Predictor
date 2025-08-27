const addedSymptomsContainer = document.getElementById('added-symptoms');
        const addSymptomBtn = document.getElementById('add-symptom');
        const micBtn = document.getElementById('mic-btn');
        const symptomInput = document.getElementById('custom-symptom');
        const modelSelect = document.getElementById('model-select');
        const symptomListDiv = document.querySelector('.symptom-list');

        addSymptomBtn.addEventListener('click', () => {
            let newSymptom = symptomInput.value.trim();
            if (newSymptom) {
                addSymptom(newSymptom);
                symptomInput.value = '';
            }
        });

        function addSymptom(symptom) {
            const existingBadges = [...document.querySelectorAll('.symptom-badge')];
            if (existingBadges.some(badge => badge.textContent.toLowerCase() === symptom.toLowerCase())) {
                return;
            }
            let badge = document.createElement('span');
            badge.className = 'symptom-badge';
            badge.textContent = symptom;
            badge.title = "Click to remove";

            badge.addEventListener('click', () => {
                badge.remove();
                hiddenInput.remove();
            });

            let hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'symptoms';
            hiddenInput.value = symptom;

            addedSymptomsContainer.appendChild(badge);
            addedSymptomsContainer.appendChild(hiddenInput);
        }

        micBtn.addEventListener('click', () => {
            if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
                alert('Speech recognition not supported in this browser.');
                return;
            }
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();

            micBtn.textContent = 'Listening...';

            recognition.onresult = (event) => {
                const speechResult = event.results[0][0].transcript;
                addSymptom(speechResult);
                micBtn.textContent = '🎤 Speak';
            };

            recognition.onerror = (event) => {
                alert('Error occurred in speech recognition: ' + event.error);
                micBtn.textContent = '🎤 Speak';
            };

            recognition.onend = () => {
                micBtn.textContent = '🎤 Speak';
            };
        });

        // Update symptom list dynamically on model selection change
        modelSelect.addEventListener('change', async () => {
            const selectedModel = modelSelect.value;
            const response = await fetch('/symptoms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: selectedModel })
            });
            const data = await response.json();

            symptomListDiv.innerHTML = '';
            data.symptoms.forEach(symptom => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <input type="checkbox" name="symptoms" value="${symptom}">
                    <label>${symptom.replace('_', ' ').charAt(0).toUpperCase() + symptom.replace('_', ' ').slice(1)}</label>`;
                symptomListDiv.appendChild(div);
            });

            // Clear any added custom symptoms when switching models
            addedSymptomsContainer.innerHTML = '';
        });

        document.getElementById('symptom-form').addEventListener('submit', async function (e) {
            e.preventDefault();
            const checkedBoxes = document.querySelectorAll('input[name="symptoms"]:checked, input[name="symptoms"][type="hidden"]');
            const symptoms = Array.from(checkedBoxes).map(cb => cb.value);
            const selectedModel = modelSelect.value;

            const response = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms, model: selectedModel })
            });
            const result = await response.json();
            let diseaseName = result.disease;
            if (typeof diseaseName === 'string') {
                diseaseName = diseaseName.replace(/[\[\]']+/g, '');
            }
            document.getElementById('result').innerHTML =
                `<span>Predicted Disease: <b>${diseaseName}</b></span>`;
        });
