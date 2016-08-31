var http = require('http');
var fs = require('fs');

// creating a server using http module:
var server = http.createServer(function (request, response) {
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:

    var requestURLParts = request.url.split('/');

    if (request.url === '/') {
        serveHTML('./index.html');
    } else if (request.url == '/ninjas') {
        serveHTML('./ninjas.html');
    } else if (request.url == '/dojos/new') {
        serveHTML('./dojos.html');
    } else {
        serveHTML('./404.html', 404);
    }

    function serveHTML(path, httpCode) {
        if (httpCode == undefined) {
            httpCode = 200;
        }

        fs.readFile(path, 'utf8', function(errors, contents) {
            response.writeHead(httpCode, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
});
// tell your server which port to run on
server.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");
