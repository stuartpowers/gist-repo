//from http://www.quora.com/Whats-the-best-way-to-globally-capture-unanticipated-JavaScript-errors-and-log-them-on-the-server-side

// In your head
!function(global) {
    global._err = [];
    global.onerror = function(msg, url, line) {
         global._err.push(arguments);
    }
} (window);

// When jquery loads
!function(global) {

    var post = function() {
        $.post("/errors", {
	    "date": ""+new Date(),
	    "msg": err[0],
   	    "file": err[1],
    	    "line": err[2],
	    "url" : document.location.href
        });
    };

    global._err = function() {
        post(arguments);
    }

} (window);