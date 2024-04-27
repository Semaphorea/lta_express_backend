#!/usr/bin/env node

/** 
 * Module dependencies.
**/   
import  http from 'http';
import  debug from 'debug'; //var debug = require('debug')('lta-express-backend:server');
import  EventEmitter  from 'events';  
import  AppFactory   from '../src/Application/Factory/AppFactory.ts';    //var App=require('../app');    
import  App from '../src/Application/app.ts';
import proxy from 'express-http-proxy';      

import bearerToken from 'express-bearer-token';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import AuthorizationController from '../src/Controllers/authorizationController.ts'


//Définition de Listeners Max (Evite les pb de fuite de mémoire)
const emitter = new EventEmitter();  
emitter.setMaxListeners(25);




/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');

 
/**
 * Creation de l'Application
 */ 
let app:App | null | undefined;

    let appfactory=AppFactory.initiate();
     app= appfactory?.getAppInstance(); 
     app?.getAppRoot();  
   //  app?.addProperties();  
     app !== undefined ? console.log('server.ts L32', "app exist"): console.log("server.ts L32 app undefined ");  
     
// let app= express();
// console.log(app);  
 


/**
 * Element de sécurisation 
 **/

//const apiProxy= new  Proxy('localhost:4200',{proxyReqPathResolver: (req:any)=>require('url').parse(req.baseUrl).path});
   
 

//Gestion de proxy (lorsque Express est utilisé derrière un proxy)
//ou app.set ...  
app?.getApp().set('trust proxy', function (ip:string){ if (ip === '127.0.0.128' ) return true; //trust ip   // semble ne pas fonctionner  
                                                       else return false;});      
  
//console.log(app?.getApp());



/** Gestion de requête avec Token
//app?.getApp().use(bearerToken());

// app?.getApp().use(function (req:Request, res:Response) {
//   res.send('Token '+req.token);
// });
 **/ 

/**
* Import Middelware
**/
import router from '../routes/index.ts';
import routerPaiement from '../routes/paiement.ts';
import routerAuthenticate from '../routes/authenticate.ts'  ;
import { NextFunction, Request, Response } from 'express';



app?.getApp().use(router);
app?.getApp().use(routerPaiement); 
app?.getApp().use(routerAuthenticate);  
 
// Display routes   
// Combine the routes from all routers   
const allRoutes = [...routerAuthenticate.stack,...router.stack, ...routerPaiement.stack];

// console.log('All routes in the Express app:');
// allRoutes.forEach((route) => {
//   if (route.route) {
//     console.log(`${route.route.stack[0].method.toUpperCase()} ${route.route.path}`);
//   }
// });

 
// Middleware function to display route called
app?.getApp().use(function(req:Request, res:Response, next:NextFunction) {
    let routeCalled= req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("Route called : " + JSON.stringify(routeCalled));    
    next();    
});



// Middleware Authorization

  app?.getApp().use(
    function(req:Request,res:Response,next:NextFunction){
    bearerToken( {headerKey: 'Bearer'});

     let authorizationController = new AuthorizationController(req.token);


  }); 
  

  








/**
 * Create HTTP server.  
 */ 

//Server without TLS
var server = http.createServer(app?.getApp()); 
//console.log(server);  


//Server with TLS
//Configure TLS certificate
// const serverOptions = {
// 	// Certificate(s) & Key(s)  when certificate will be configured
//   	cert: fs.readFileSync(path.join(__dirname, 'Securite/Certificate/host.crt')),
// 	key: fs.readFileSync(path.join(__dirname, 'Securite/Certificate/privatKey.key')),  

// 	// Optional: TLS Versions
// 	maxVersion: 'TLSv1.3',
// 	minVersion: 'TLSv1.2'

// }
// import https from 'https';
//const server = https.Server(serverOptions,app?.getApp());
//Fin Server with certificate  






/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);  
server.on('error', onError);
server.on('listening', onListening);







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
    : 'port ' + addr?.port;
  debug('Listening on ' + bind);

}

export default app;   

