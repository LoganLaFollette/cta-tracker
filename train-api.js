require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
var fs = require('fs');

const app = express();
const port = 3000;
const mapid = 41400
var parentStopData;

fs.readFile('./src/assets/parent-stop-mappings.json', 'utf8', function (err, data) {
  if (err) throw err;
  parentStopData = JSON.parse(data);
});

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/trains', (_req, res) => {
  // make a call to CTA API
    axios.get(
      'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx',
      {
        params: {
          key: process.env.CTA_API_KEY,
          max: '5',
          mapid: mapid,
          outputType: 'JSON',
          // stpid: '30080'
        }
      }
    ).then(function (response) {
      res.send({name: parentStopData[mapid].descriptiveName, ...response.data})
    })
    .catch(function (error) {
      console.log(error)
    })
});

app.listen(port, () => console.log(`Train data piped to port: ${port}!`));