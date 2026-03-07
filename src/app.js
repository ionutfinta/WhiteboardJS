var http = require('http');
var fs = require('fs');
var path = require('path');

var PORT = process.env.PORT || 8080;

var mimeTypes = {
    '.html': 'text/html',
    '.htm':  'text/html',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.ico':  'image/x-icon',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2':'font/woff2',
    '.ttf':  'font/ttf',
    '.eot':  'application/vnd.ms-fontobject',
    '.json': 'application/json'
};

var projectRoot = path.resolve(__dirname, '..');

http.createServer(function(request, response) {
    var url = request.url.split('?')[0];

    if(url.indexOf("node_modules/") < 0)
        url = "/src" + url;
    
    if(url == "/src/")
        url = "/src/index.html";

    var filePath = path.resolve(path.join(projectRoot, url));

    // Prevent path traversal outside the project root
    if (!filePath.startsWith(projectRoot + path.sep) && filePath !== projectRoot) {
        response.writeHead(403, {"Content-Type": "text/plain"});
        response.end("Error 403: Forbidden.");
        return;
    }

    fs.access(filePath,  fs.constants.R_OK, (err) => {
        if(err){
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.end("Error 404: The resource you want is not found.");
            console.log(filePath + " is not readable");
        }else{
            fs.readFile(filePath, function (err, ctt) {
                if (err) throw err;
            
                var ext = path.extname(filePath);
                var contentType = mimeTypes[ext] || 'application/octet-stream';
                
                response.writeHead(200, {"Content-Type": contentType});
                response.write(ctt);
                response.end();
            });
        }
      });
}).listen(PORT);
    
console.log("Server running... \n Open http://127.0.0.1:" + PORT + "/ in your favourite web browser !");