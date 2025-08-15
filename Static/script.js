document.getElementById('symptom-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const checkedBoxes = document.querySelectorAll('input[name="symptoms"]:checked');
    const symptoms = Array.from(checkedBoxes).map(cb => cb.value);

    const response = await fetch('/predict', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({symptoms})
    });
    const result = await response.json();
    document.getElementById('result').innerText = 
        `Predicted Disease: ${result.disease}`;
});
