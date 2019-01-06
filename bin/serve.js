var http=require('http');
var fs = require('fs');
var url = require('url');
 
const port = process.argv[2] || 4000;

http.createServer(function(request,response) {
    var pathname= url.parse(request.url).pathname;
    if(pathname.endsWith('/')) pathname += 'index.html';
    pathname = './docs/'+ pathname.slice(1);
 
    fs.readFile(pathname,(err, data)=>{
        if(err) {
            console.log(err);
            response.writeHead(404,{'Content-Type': 'text/html'});
        }
        else {
            response.writeHead(200,{'Content-Type': 'text/html'});
            response.write(data.toString());
        }
        response.end();
    });
}).listen(port);
 
console.log(`Server running at http://127.0.0.1:${port}/`);