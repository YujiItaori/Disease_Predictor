 const addedSymptomsContainer = document.getElementById('added-symptoms');
        const addSymptomBtn = document.getElementById('add-symptom');
        const micBtn = document.getElementById('mic-btn');
        const symptomInput = document.getElementById('custom-symptom');

        addSymptomBtn.addEventListener('click', () => {
            let newSymptom = symptomInput.value.trim();
            if (newSymptom) {
                addSymptom(newSymptom);
                symptomInput.value = '';
            }
        });

        function addSymptom(symptom) {
            // Prevent duplicate symptoms
            const existingBadges = [...document.querySelectorAll('.symptom-badge')];
            if (existingBadges.some(badge => badge.textContent.toLowerCase() === symptom.toLowerCase())) {
                return; // already added
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
            }

            recognition.onerror = (event) => {
                alert('Error occurred in speech recognition: ' + event.error);
                micBtn.textContent = '🎤 Speak';
            }

            recognition.onend = () => {
                micBtn.textContent = '🎤 Speak';
            }
        });

        document.getElementById('symptom-form').addEventListener('submit', async function (e) {
            e.preventDefault();
            const checkedBoxes = document.querySelectorAll('input[name="symptoms"]:checked, input[name="symptoms"][type="hidden"]');
            const symptoms = Array.from(checkedBoxes).map(cb => cb.value);
            const response = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms })
            });
            const result = await response.json();
            let diseaseName = result.disease;
            if (typeof diseaseName === 'string') {
                diseaseName = diseaseName.replace(/[\[\]']+/g, '');
            }
            document.getElementById('result').innerHTML =
                `<span>Predicted Disease: <b>${diseaseName}</b></span>`;
        });
