var https = require('https');
var express = require('express');
var fs = require('fs');

var router = express.Router();


/* End Points */
/*
router.get("/", function(req, res) {
    url = 'https://miro.medium.com/max/4820/1*4jkVSbW-OL84QVCvxYtIag.png'
    saveImageToDisk(url, 'a.png')
    res.send("ciao")
});
*/

router.post("/", function(req, res) {
    var image = req.body[0]
    var data = image.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFile('assets/images/a.jpg', data, {encoding: 'base64'}, function(err){
        //res.send(err)
    });
    res.send("image_saved")
});


function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
}


function saveImageToDisk(url, localPath) {
    var file = fs.createWriteStream(localPath);
    https.get(url, function(response) {
        response.pipe(file);
    });
}




module.exports = {
    router
}