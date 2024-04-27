import express,{ Request, Response} from "express";
import { authentificationController } from "../src/Controllers/authentificationController.ts";
import { ManageDonnees } from '../src/Services/manageDonnees.service.ts';
import { UserController } from '../src/Controllers/userController.ts';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";  

import { environnment } from "../Configuration/Environnement/environnement.dev.ts";
import path from 'path';
import { fileURLToPath } from 'url';  


const routerAuthenticate=express.Router();
    


/* Header */
function setHeader(res: Response, methode: string) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', methode);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  



const manageDonnees = new ManageDonnees();

let accesDonnees='mock';
  



//Get User Last-Id (Authentification )  
routerAuthenticate.get('/users/last-id', (req: Request, res: Response) => {
    setHeader(res, 'GET');
  
    manageDonnees.instantiateProperties('users');
    let userController: UserController = new UserController();
    let ret = userController.fetchLastId(accesDonnees);
    res.status(200).json({ id: ret });
  });
  
  
  //Authentification
  routerAuthenticate.post('/authenticate', async (req: Request, res: Response) => {
  
    let authenController = new authentificationController();
    // console.log("index.ts L42 test object authentificationController : ",authenController.User);
     const identifiant = req.body.identifiant;
     const password = req.body.password;  
     console.log("index.ts L45 identifiant : ", identifiant );    
     console.log("index.ts L46 password : ", password );
  

    let authentification: boolean = authenController.validateAuthentification(req, res, identifiant, password, accesDonnees);


     console.log("index.ts L52 test authentification : ", authentification);
    if (authentification == true) {
      let userId: number | undefined;
      accesDonnees == "mock" ? userId = authenController.findUserIdForIdentifiantFromMock(req, res, identifiant) : 'bdd';
  
      // console.log("index.ts L56 test authentification UserId: ", userId);
      if (userId != undefined) {
    
        let jwtBearerToken=authenController.createToken(userId);   
  
        // send the JWT back to the user via Http response body
        // Il est aussi possible d'utiliser des cookies ou response header  
        res.setHeader('Authorization', 'Bearer ' + jwtBearerToken);
        res.status(200).json({ "idToken": jwtBearerToken }) 
      }  
    }    
    else {
    
      res.sendStatus(401);
    }
  
  }); 
  
  //Get User Id (Authentification )  
  routerAuthenticate.get('/users/:id', (req: Request, res: Response) => {
    manageDonnees.instantiateProperties('users');
    console.log(manageDonnees.typeElementJson);
    accesDonnees == "mock" ? manageDonnees.findFromMockById(req, res) : 'bdd';
  });
  
  routerAuthenticate.get('/users/last-id', (req: Request, res: Response) => {
    setHeader(res, 'GET');
    let userController: UserController = new UserController();
    // console.log("Index.tx L226 : ",expController);    
    let ret = userController.fetchLastId(accesDonnees);
    res.status(200).json({ id: ret });
  })
  /*POST  User Create */
  routerAuthenticate.post('/users/create', async (req: Request, res: Response) => {
    let ret: Boolean = false;
    setHeader(res, 'POST');
  
    console.log("index.ts L251 :"+req.header('content'));   
    let requestValue: any = req.body
  
    console.log("index.ts L254", requestValue);
    //if(requestValue==undefined){requestValue=null;}
    let userController = new UserController();
  
  
    //Les donnees user sont envoyés sans id
    let ex = userController.setRequestUser(requestValue);
    console.log('index.ts L261 : ', ex);
  
    let promise: Promise<Boolean> = userController.persist(accesDonnees);
    promise.then((rea) => {  res.status(200).json({ 'User Created': rea }); });
  
  }
  ) 
  
  
  
  
  
  
  /*GET User & User Id */
  routerAuthenticate.get('/users', (req: Request, res: Response) => {
    manageDonnees.instantiateProperties('users');
    accesDonnees == "mock" ? manageDonnees.findAllFromMock(res) : 'bdd';
  })
  
  
   
  
  
  
  
  
  /*GET Users Delete */
  routerAuthenticate.get('/users/delete/:id', (req: Request, res: Response) => {
    setHeader(res, 'POST');
    let ret: Boolean = false;
    let expController: UserController = new UserController();
    ret = expController.deleteUser(accesDonnees, Number.parseInt(req.params.id));
  
    ret ? res.status(200).json("{ \"Users " + req.params.id + "\" : \"deleted\" }") : res.status(200).json("{ \"Users  " + req.params.id + "\" : \"no deleded\"}");
  }
  )
  



  
export default routerAuthenticate; 