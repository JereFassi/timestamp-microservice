// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res) => {
  const inputDate = req.params.date;
  let result = {};
  if (!inputDate) {
    const date = new Date();
    result = {
      unix: date.getTime(),
      utc: date.toUTCString(),
    }
  }
  res.json(result);
});

app.get("/api/:date?", (req, res) => {
  const inputDate = req.params.date;
  let result = {};
  let validDate = new Date();
  if (isNaN(inputDate)) {
    validDate = new Date(inputDate);
  } else {
    validDate = new Date(parseInt(inputDate));
  }
  if (isNaN(validDate)) {
    result = { error: "Invalid Date" }
  } else {
    result = {
      unix: validDate.getTime(),
      utc: validDate.toUTCString(),
    }
  }
  res.json(result);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
