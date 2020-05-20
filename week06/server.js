
const http = require('http');
const server = http.createServer(function (req, res) {

    console.log('Request recided');
    console.log(req.headers)
    console.log(req.body)
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('好好学习，天天向上');
    res.end(`<html maaa=a >
    <head>
      <style>
            body div div #myid{
                width:100px;
                background-color: #ff5000;
            }
            body div img{
                width:30px;
                background-color: #ff1111;
            }
      </style>
  </head>
  <body>
      <div id ='test'>
          <img id="myid"/>
          <img />
      </div>
  </body>
  </html>`);
// res.end(` <img id="myid"/><img />`)
    

});

server.listen(8088)
console.log('Server running on port 8000');