require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
var fs = require('fs');

const app = express();
const port = 3000;
// roosevelt 41400
// damen     40590
const mapid = 41400
var parentStopData;

fs.readFile('./src/assets/parent-stop-mappings.json', 'utf8', function (err, data) {
  if (err) throw err;
  parentStopData = JSON.parse(data);
});

app.use(cors({
  origin: 'http://www.the-cta-tracker.com'
}));
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rate Limiter
var RateLimit = require('express-rate-limit');
var limiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minute - TODO: check CTA rate limit
  max: 10
});
// apply rate limiter
app.use(limiter);

app.options('/trains', cors())
app.get('/trains', cors(), (_req, res) => {
  // make a call to CTA API
    axios.get(
      'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx',
      {
        params: {
          key: process.env.CTA_API_KEY,
          max: '10',
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

var server = app.listen(port, () => {
  var host = server.address().address;
  var port = server.address().port;
    console.log("server is listening at http://%s:%s", host, port);
});