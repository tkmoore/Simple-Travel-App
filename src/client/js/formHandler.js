
// Function to convert date to UTC to disreagrd DST and timezones
// giving us an accurate calculation of days till trip
function dateDiffInDays(a) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const date1 = new Date(a);
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2_local = new Date();
    const utc2 = Date.UTC(utc2_local.getFullYear(), utc2_local.getMonth(), utc2_local.getDate());
  
    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
}

// Asyc function for submitting days and trip location
async function apiSubmit(event) {
    event.preventDefault();

    // Capture dates and location from form fields
    let formDateStart = document.getElementById('trip-start').value
    let formDateEnd = document.getElementById('trip-end').value
    let formText = document.getElementById('name').value

    // Check for valid input in location field
    if (!Client.checkForValidText(formText)) {
       return;
    }

    // Creates a data object to pass to the server
    const cityData = {
        city: formText,
        date: formDateStart
    };

    // Send to the city data to the backend server to make the various api requests
    try {
        const fetchLocation = await fetch('http://localhost:8081/api/coordinates', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cityData)
        });
        const locationData = await fetchLocation.json();

        // Parses server response into readable results
        const resultSentence = `You've selected a ${dateDiffInDays(formDateEnd) - dateDiffInDays(formDateStart)} day long trip to ${formText}, ${locationData[0].addresses[0].country}. Typical weather then is a high of ${locationData[1].forecast.forecastday[0].day.maxtemp_f} and a low of ${locationData[1].forecast.forecastday[0].day.mintemp_f}, with ${locationData[1].forecast.forecastday[0].day.condition.text}. You have ${dateDiffInDays(formDateStart)} days till your trip.`;

        // Modifies DOM to display the results of the weather, days till trip, and image of the location
        document.getElementById('results').innerHTML = resultSentence
        document.getElementById('trip-img').src = locationData[2].hits[0].webformatURL
        document.getElementById('trip-img').alt = formText

    } catch (error) {
        alert("The form field cannot be left blank. Please provide an article or text snippet for evaluation")
        console.log('error', error);
    }
}

export { apiSubmit }