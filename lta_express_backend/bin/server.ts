import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
const app:Express = express(); 
const port = 3000;
const routes = require('../routes/index.ts');

// Mount the routes middleware
app.use('/', routes);
app.set('view engine', 'pug')


// Error handling middleware
app.use((err:Error, req:Request, res:Response, next:NextFunction)=> {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');     
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port '+port);
});
