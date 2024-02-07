function checkForValidText(inputText) {
    console.log("::: Running checkForValidText :::", inputText);

    const regex = /^[a-zA-Z ]+$/;

    if (!inputText.trim()) {
        alert('Form must not be left blank when submitting. Please provide a valid input to analyze.');
        return false;
    }
  
    if (!regex.test(inputText.trim())) {
        alert('Input contains invalid characters. No numbers or special charaters allowed.');
        return false;
    }

    return true;
}

export { checkForValidText }