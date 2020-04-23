var http = require('http');
var fs = require('fs');

const PORT=8080;

http.createServer(function(request, response) {
    var url = request.url;

    if(url.indexOf("node_modules/") < 0)
        url = "/src" + url;
    
    if(url == "/src/")
        url = "/src/index.html";

    fs.access("." + url,  fs.constants.R_OK, (err) => {
        if(err){
            response.writeHeader(404, {"Content-Type": "text"});
            response.write("Error 404: The ressource you want is not found.");
            response.end("Error 404: The ressource you want is not found.");
            console.log(`.${url} ${err ? 'is not readable' : 'is readable'}`);
        }else{
            fs.readFile("." + url, function (err, ctt) {
                if (err) throw err;
            
                if(url.endsWith(".htm") || url.endsWith(".html"))
                    response.writeHeader(200, {"Content-Type": "text/html"});
                else if(url.endsWith(".js"))
                    response.writeHeader(200, {"Content-Type": "application/javascript"});
                else if(url.endsWith(".css"))
                    response.writeHeader(200, {"Content-Type": "text/css"});
                else if(url.endsWith(".ico"))
                    response.writeHeader(200, {"Content-Type": "image/x-icon"});
                else
                    response.writeHeader(200, {"Content-Type": "text/plain"});
                
                response.write(ctt);
                response.end();
            });
        }
      });
}).listen(PORT);
    
console.log("Server running... \n Open http://127.0.0.1:8080/ in your favourite web browser !");