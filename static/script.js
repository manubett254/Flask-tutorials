document.getElementById('audioForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('audioFile');
    const resultDiv = document.getElementById('result');

    if (fileInput.files.length === 0) {
        resultDiv.textContent = 'Please select an audio file.';
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Prediction failed');
        }

        const data = await response.json();
        resultDiv.textContent = `Prediction: ${data.prediction}`;
    } catch (error) {
        resultDiv.textContent = 'Error: ' + error.message;
    }
});