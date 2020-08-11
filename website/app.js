/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=1d12a9545b7f9b003a6a09849ed282f4&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+' / '+ (d.getMonth() + 1)+' / '+ d.getFullYear();

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const data = await response.json();
        console.log(data)
        return data;
    } catch(err) {
            console.log('There is an error: ', err);
    }
};

const getData = async (url) => {
    const response = await fetch(url);

    try {
        const data = await response.json();
        console.log(data)
        return data;
    } catch(err) {
            console.log('There is an error: ', err);
    }
};


document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value || 'No feelings for now';

    if (zipCode) {
        document.getElementById('errorMsg').style.display = 'none';

        getData(baseURL+zipCode+apiKey)
        .then(
            (data) => {
                postData('/weather', 
                    { date: newDate, 
                      temp: data.main.temp, 
                      feelings 
                    }
                );
            }
        ).then(
            () => updateUI()
        );
    } else {
        document.getElementById('errorMsg').style.display = 'block';
    }
}


async function updateUI() {
    const response = await fetch('/data');

    try {
        const data = await response.json();
        
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temp} °C`;
        document.getElementById('content').innerHTML = `Feelings: ${data.feelings}`;

    } catch(err) {
        console.log('There is an error: ', err);
    }
}
