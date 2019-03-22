var http = require('http');

const mainPort = 8080

const mainServer = http.createServer(function (req, res) {
  res.writeHead(200)
//   const q = `$(function () {
//   // if user is running mozilla then use it's built-in WebSocket
//   window.WebSocket = window.WebSocket || window.MozWebSocket;
//
//   var connection = new WebSocket('ws://127.0.0.1:8080');
//
//   connection.onopen = function () {
//     // connection is opened and ready to use
//   };
//
//   connection.onerror = function (error) {
//     // an error occurred when sending/receiving data
//   };
//
//   connection.onmessage = function (message) {
//     // try to decode json (I assume that each message
//     // from server is json)
//     try {
//       var json = JSON.parse(message.data);
//     } catch (e) {
//       console.log('This doesn\\'t look like a valid JSON: ',
//           message.data);
//       return;
//     }
//     // handle incoming message
//   };
// });`
  res.end("<h1 style='text-align: center'>Kappa 123</h1>");
})

mainServer.listen(mainPort, (err) => {
  if (err) {
    return console.error('Error: ', err)
  }
  console.log('Main server started on ' + mainPort)
})


// function onRequest(client_req, client_res) {
//   console.log('serve: ' + client_req.url);
//
//   var options = {
//     hostname: 'www.google.com',
//     port: 80,
//     path: client_req.url,
//     method: client_req.method,
//     headers: client_req.headers
//   };
//
//   var proxy = http.request(options, function (res) {
//     client_res.writeHead(res.statusCode, res.headers)
//     res.pipe(client_res, {
//       end: true
//     });
//   });
//
//   client_req.pipe(proxy, {
//     end: true
//   });
// }

// var WebSocketServer = require('ws').Server;
//
//
// var socket = new WebSocketServer({server: mainServer});
//
// socket.on('open', function () {
//   console.log('"open" event!');
//   socket.send('hello world');
// });
//
// socket.on('message', function (data, flags) {
//   console.log('"message" event! %j %j', data, flags);
//   socket.close();
// });
//

var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
  port: 8081
});
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);

    for (var key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

  setInterval(()=>{
    ws.send('kek')
  },500)

});

// var client = require('tls')
//   .connect(mainPort, 'localhost', function () {
//     console.log('connected');
//     client.write('hello');
//   })
//   .on('data', function (data) {
//     console.log('received', data.toString());
//   })
//   .on('close', function () {
//     console.log('closed');
//   });