// error log

if (process.argv.length !== 3) {
	console.log("How to use: node app.js filename.html");
	return;
}

//stuff you need

var fs = require("fs");
var path = require("path");
var htmlCleaner = require("./htmlcleaner.js");

//get second item from process.argv

var file = process.argv[2]

fs.readFile(file, 'utf8', function(error, data) {
	if (error){
		console.log("Unable to find file--maybe you typed the filename wrong?");
		return;
	}
	//store the cleaned html from the htmlcleaner function

	var callback = function(text) {


		//write the file with a new filename

		var fileName = path.parse(file);
	    fs.writeFile(fileName.name + "-1" + fileName.ext, text,
	        	function (error){
	        if (error) throw error;
	    });

	}

	var text = htmlCleaner(data, callback);

});