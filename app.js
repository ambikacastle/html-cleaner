// error log

if (process.argv.length !== 3) {
	console.log("How to use: node app.js filename.html");
	return;
}

//stuff you need

var jsdom = require("jsdom");
var fs = require("fs");
var path = require("path");

//get second item from process.argv

var file = process.argv[2]

fs.readFile(file, 'utf8', function(error, data) {
	if (error){
		console.log("Unable to find file--maybe you typed the filename wrong?");
		return;
	}
    jsdom.env(data, [], function (errors, window) {
        var $ = require('jquery')(window);

		//convert <span class="char-style-override-2"> to <em></em>

		$( ".char-style-override-2" ).wrap( "<em></em>" );

		//convert <span class="char-style-override-5"> to <em></em>

		$( ".char-style-override-5" ).wrap( "<em></em>" );

		//convert <span class="Italic"> to <em></em>

		$( ".Italic" ).wrap( "<em></em>" );

		//convert <span class="char-style-override-3"> to <strong></strong>

		$( ".char-style-override-3" ).wrap( "<strong></strong>" );

		// delete all <div></div> tags - keep what's inside

		$('div').contents().unwrap();

		// delete all <span></span> tags - keep what's inside

		$('span').contents().unwrap();

		// delete all class="" in <p> and <img>

		$( "p" ).removeClass();
		$( "img" ).removeClass();

		// delete stray <br />

		$("br").remove();

		// delete stray <span>

		$("span").remove();

		// delete all <img>

		$("img").remove();

		// delete all empty <p></p>

		$("p:empty").remove();

		// delete <link>

		$("link").remove();

		// delete all <a></a> tags - keep what's inside

		$("a").contents().unwrap();

		// delete <meta>

		$("meta").remove();

		//clean up all the spaces

		var text = window.document.documentElement.outerHTML;
		text = text.replace(/\n\s*\n\s*\n/g, '\n\n');

		//write the file with a new filename

		var fileName = path.parse(file);


        fs.writeFile(fileName.name + "-1" + fileName.ext, text,
            	function (error){
            if (error) throw error;
        });
    });
});





