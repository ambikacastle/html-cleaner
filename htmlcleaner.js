module.exports = function(data, callback) {
	//stuff you need
	var jsdom = require("jsdom");

	jsdom.env(data, [], function (errors, window) {
        var $ = require('jquery')(window);

        //get rid of the <html>, <head>, <body> tags - keep what's inside
        $('head').contents().unwrap();
        $('body').contents().unwrap();


		//convert some span classes to <em></em>
		$( ".Italic" ).wrap( "<em></em>" );
		$( ".CharOverride-2" ).wrap( "<em></em>" );
		$( ".CharOverride-3" ).wrap( "<em></em>" );
		$( ".CharOverride-7" ).wrap( "<em></em>" );
		$( ".CharOverride-8" ).wrap( "<em></em>" );
		$( ".CharOverride-9" ).wrap( "<em></em>" );

		//convert span classes to <strong></strong>

		$( ".char-style-override-3" ).wrap( "<strong></strong>" );
		$( ".Bold" ).wrap( "<strong></strong>" );

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

		// delete all empty <em></em>

		$("em:empty").remove();

		// delete <link>

		$("link").remove();

		// delete all <a></a> tags - keep what's inside

		$("a").contents().unwrap();

		// delete all empty <a></a>

		$("a:empty").remove();

		// delete <meta>

		$("meta").remove();

		//store all the cleaned html so far in a variable

		var text = window.document.documentElement.outerHTML;

		//clean up all the spaces

		text = text.replace(/\n\s*\n\s*\n/g, '\n\n');

		//clean up all the tabs

		text = text.replace(/\t/g, '');

		callback(text);

	});

}