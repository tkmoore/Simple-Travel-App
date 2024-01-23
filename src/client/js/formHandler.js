const baseURL = 'https://api.meaningcloud.com/sentiment-2.1'

async function apiSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById('name').value
    if (!Client.checkForValidText(formText)) {
        return;
    }

    const data = {
        text: `${formText}`
    };

    try {
        const response = await fetch('http://localhost:8081/api/sentiment', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const newData = await response.json();
        console.log(newData);
        const resultSentence = `${newData.sentence_list[0].text}\nThe text has an agreement of ${newData.agreement}, with a confidence level of ${newData.confidence}%. The text is ${newData.irony.toLowerCase()} and is considered ${newData.subjectivity.toLowerCase()} with a polarity score of ${newData.score_tag}.`;
        console.log(resultSentence);
        document.getElementById('results').innerHTML = resultSentence

    } catch (error) {
        alert("The form field cannot be left blank. Please provide an article or text snippet for evaluation")
        console.log('error', error);
    }
}

export { apiSubmit }