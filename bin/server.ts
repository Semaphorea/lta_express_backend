#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('../app');  
var debug = require('debug')('lta-express-backend:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

  
/**
 * Create HTTP server.
 */

var server = http.createServer(app); 

 

  
//console.log(app);
//let bug=debug('GET /articles') ;  
//console.log("L33 "+bug); 



/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



/**
 * Import Middelware
 */
let router = require('../routes/index');

  

app.use('/articles',router);
app.use('/articles/:id',router);   




app.use('/experts/',router);   
app.use('/experts/:id',router);   
//console.log(app._router.stack);     
  
console.log(router.stack);
//Affichage des routes
// app._router.stack.forEach(function(r:any){
//   //console.log(r);
//   console.log("Regexp : "+r.regexp); 
//   console.log("Path : "+r.path); 
//   if (r.route && r.route.path){
//     console.log(r.route.path); 
//   }  
// })    
  

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val:any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error:any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

//console.log("Index L212") 
//console.log(router); 
//console.log(router.stack[0]); 


