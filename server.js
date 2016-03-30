var express = require('express');
var app = express();
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
var htmlCleaner = require("./htmlcleaner.js")

app.use(express.static('public'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/cleanhtml', upload.any(), function(req,res){
	htmlCleaner(req.files[0].buffer.toString(), function(text){
		res.set("Content-Type", "text/plain");
		res.send(text);
	});

});

