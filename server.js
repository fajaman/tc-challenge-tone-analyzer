'use strict';
var express = require('express'); // eslint-disable-line node/no-missing-require
var app = express();
var dotenv = require('dotenv');
var watson = require('watson-developer-cloud');
var fs = require('fs');
// bundle the code
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/' // Same as `output.publicPath` in most cases.
  })
);

app.use(express.static('public/'));

// optional: load environment properties from a .env file
dotenv.load({ silent: true });

// For local development, specify the username and password or set env properties
var ltAuthService = new watson.AuthorizationV1({
  username: '01576504-c62c-49ab-b694-a23310b62f71',
  password: 'rb8zSzSNYG6i',
  url: watson.ToneAnalyzerV3.URL
});

app.get('/api/token/tone_analyzer', function(req, res) {
  ltAuthService.getToken(function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});


//Open port

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port, function() {
  console.log('Watson browserify example server running at http://localhost:%s/', port);
});

//Create text file 'log.txt'

fs.appendFile('log.txt', 'WAITING FOR SPECIFICATIONS DATA \n\n', function (err) {
  if (err) {
    // append failed
  } else {
    // done
  }
});

//Post request write request to .txt file

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true , parameterLimit:50000 }));	

app.post('/api/writefile', function(req, res) {


var newline = '\n********************************************************************************************************************************\n';
	//console.log(req.body);
    var fileData = req.body + newline;
    fs.appendFile('log.txt', fileData , function(err) {
		if (err) {
    console.log('Error retrieving data: ', err);
      return res.status(500).send('Error writing file');
      }
      res.send("File write success");
    });
});



