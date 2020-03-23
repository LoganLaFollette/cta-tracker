const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var request = require('request');

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/trains', (req, res) => {
    // We will be coding here
    request({
      uri: 'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx',
      qs: {
        key: 'dfbde4a79fa6438292426b120cc00f8a',
        max: '5',
        mapid: '41400',
        outputType: 'JSON',
        stpid: '30080'
      }
    }).pipe(res);
});

app.listen(port, () => console.log(`Train data piped to port: ${port}!`));