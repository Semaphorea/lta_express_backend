
import express, { Application, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';

import createError from 'http-errors';
import { fileURLToPath } from 'url';



 export class App {


  //var usersRouter = require('./routes/users');    
  private app: any;

  constructor() {
    this.app = this.createApp();
  }



  createApp() {

    if (!this.app) {
      return this.app = express();
      //console.log("app.ts L28 : ", this.app); 
    }
    else { return this.app; }
  }  


  addProperties() {


    
      // __dirname is not fonctionnal in ES context that's why i must use the 2 following lines. E. Hamon 18/04/2024 
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename); 
     
      
      console.log(__dirname);   
    // View engine setup
    this.app.set('views', path.join(__dirname, '/../..views'));
    this.app.set('view engine', 'pug');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, '/../../public')));


    // error handler
      this.app.use(function (err: Error, req: Request, res: Response, next: NextFunction): any {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {}; 

      // render the error page
      res.status(res.statusCode || 500);  
      res.render('error');
    });

    // catch 404 and forward to error handler
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      next(createError(404));
    });
  }


   getAppRoot() {
          // __dirname is not fonctionnal in ES context that's why i must use the 2 following lines. E. Hamon 18/04/2024 
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename); 
    let currentDir = __dirname;
    while(!fs.existsSync(path.join(currentDir, 'package.json'))) {
      currentDir = path.join(currentDir, '..')  
    }
  
    (global as any ).APP_ROOT_PATH= currentDir;  
    return currentDir  ;
  }  

  getApp() {
    return this.app;
  }
  setApp(app: Application) {
    this.app = app;  
  }

}



export default App;




