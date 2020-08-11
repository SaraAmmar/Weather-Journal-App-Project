// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
app.listen(port, listening);

function listening() {
    console.log(`Server is running on localhost:${port}`);
}


app.get('/weather', (req, res) => {
    console.log(req.body)
});

app.post('/weather', (req, res) => {
    console.log(req.body);

    projectData = {
        date: req.body.date, 
        temp: req.body.temp, 
        feelings: req.body.feelings
    };

    res.send(projectData);

    console.log('projectData', projectData);    
});


app.get('/data', (req, res) => {
    res.send(projectData);
});

app.post('/data', (req, res) => {
    res.send(projectData);
});