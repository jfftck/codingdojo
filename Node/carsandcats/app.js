// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');

// creating a server using http module:
var server = http.createServer(function (request, response) {
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:

    var requestURLParts = request.url.split('/');

    if (request.url === '/') {
        serveHTML('./views/index.html');
    } else if (requestURLParts.length > 2 && requestURLParts[2] === 'new') {
        serveHTML('./views/submit.html');
    } else if (fs.existsSync('./views/' + requestURLParts[1] + '.html')) {
        serveHTML('./views/' + requestURLParts[1] + '.html');
    } else if (requestURLParts[1] === 'stylesheets' && fs.existsSync('.' + request.url)) {
        fs.readFile('.' + request.url, 'utf8', function(errors, contents) {
            response.writeHead(200, {'Content-type': 'text/css'});
            response.write(contents);
            response.end();
        });
    } else if (requestURLParts[1] === 'images' && fs.existsSync('.' + request.url)) {
        fs.readFile('.' + request.url, function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('File not found!!!');
    }

    function serveHTML(path) {
        fs.readFile(path, 'utf8', function(errors, contents) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
});
// tell your server which port to run on
server.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");
