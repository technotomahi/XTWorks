var http=require('http');

http.createServer().on('request',function(request,response){
    response.writeHead(200,{'content-type':'text/plain'});
    response.write("Welcome to node");
    console.log('inside the callback'+request.url);

    response.end();
}).listen(3000);
console.log('server listening to port');