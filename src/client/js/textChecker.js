function checkForValidText(inputText) {
    console.log("::: Running checkForValidText :::", inputText);

    const regex = /^[a-zA-Z0-9. ]+$/;

    if (!inputText.trim()) {
        alert('Form must not be left blank when submitting. Please provide a valid input to analyze.');
        return false;
    }
  
    if (!regex.test(inputText.trim())) {
        alert('Input contains invalid characters. Only letters, numbers, periods, and spaces are allowed.');
        return false;
    }

    return true;
}

export { checkForValidText }