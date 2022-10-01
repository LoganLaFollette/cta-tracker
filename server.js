//Install express server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
var fs = require('fs');

const app = express();

// roosevelt 41400
// damen     40590
const mapid = 41400
var parentStopData;

fs.readFile('./src/assets/parent-stop-mappings.json', 'utf8', function (err, data) {
  if (err) throw err;
  parentStopData = JSON.parse(data);
});

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

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/cta-tracker'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/cta-tracker/index.html'));
});

// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 8080, () => {
  var host = server.address().address;
  var port = server.address().port;
    console.log("server is listening at http://%s:%s", host, port);
});