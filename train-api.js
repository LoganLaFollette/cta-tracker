const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var request = require('request');

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/trains', (_req, res) => {
    // We will be coding here
    request({
      uri: 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx',
      qs: {
        key: process.env.CTA_API_KEY,
        max: '5',
        mapid: '40590',
        outputType: 'JSON',
        // stpid: '30080'
      }
    }).pipe(res);
});

app.listen(port, () => console.log(`Train data piped to port: ${port}!`));