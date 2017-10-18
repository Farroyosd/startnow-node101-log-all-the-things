const express = require('express');
const fs = require('fs');
const app = express();
var logData = [];



 
 app.use('/', (req, res, next) => {
    var cache = {}
    
    var userAgent = req.headers['user-agent'];
    cache["Agent"] =  req.headers['user-agent']
    
    var date1 = new Date();
    var dateAndTime = date1.toISOString();
    cache["Time"] = new Date();

    var method = req.method;
    cache["Method"]= req.method;;
    var resource = req._parsedUrl.path;
    cache["Resource"] = req._parsedUrl.path;
    var version = 'HTTP/' + req.httpVersion;
    cache["Version"] = 'HTTP/' + req.httpVersion;
    var statusCode = req.socket._httpMessage.statusCode;
    cache["Status"] = req.socket._httpMessage.statusCode;

    var headerInfo = userAgent + "," + dateAndTime + "," + method +"," + resource + "," + version + "," + statusCode + '\n';
    
    logData.push(cache)
    console.log(headerInfo);
    
    fs.appendFile('./log.csv', headerInfo, function (err) {
        if (err) throw err;
        // console.log('Saved!');
      });

    next();
 });

app.get('/', (req, res) => {
// write your code to respond "ok" here
    
   res.send('ok');


    
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here

        res.json(logData);
  });
    


module.exports = app;
