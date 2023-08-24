import {Request,Response} from 'express';
import fs from 'fs';
import { FetchDonnees } from '../src/Services/fetchDonnees.service';


var express = require('express');
var router = express.Router();

let accesDonnees='mock';

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:any) {
  res.render('index', { title: 'Express' });
});



/*GET Articles & Articles Id */ 
  router.get('/articles', (req:Request,res:Response) => { 	
      accesDonnees=="mock" ?  FetchDonnees.findDonnees(res,'articles')  :  'bdd' ;
  })    


  router.get('/articles/:id', (req:Request, res:Response) => {    
     accesDonnees=="mock" ? FetchDonnees.findFromMockById(req, res,'articles')  :  'bdd' ;
   } );


   
  /*GET Expert & Expert Id */
  router.get('/experts', (req:Request,res:Response) => {
    
     accesDonnees=="mock" ?   FetchDonnees.findDonnees(res,'experts') :  'bdd' ;	
  })   
   
  router.get('/experts/:id', (req:Request, res:Response) => {
    accesDonnees=="mock" ?  FetchDonnees.findFromMockById(req, res,'experts')  :  'bdd' ;}
    );
  
  
  /*GET Expertise & Expertise Id */
  router.get('/expertises', (req:Request,res:Response) => {
    accesDonnees=="mock" ?  FetchDonnees.findDonnees(res,'expertises') :  'bdd' ;
        })  
  
  router.get('/expertises/:id', (req:Request, res:Response) => {
    accesDonnees=="mock" ?   FetchDonnees.findFromMockById(req, res,'expertises') :  'bdd' ;
  });
  
  /*GET Evenements & Evenements Id */
  router.get('/evenements', (req:Request,res:Response) => {	
    accesDonnees=="mock" ?   FetchDonnees.findDonnees(res,'evenements') :  'bdd' ;
  })   
  
  router.get('/evenements/:id', (req:Request, res:Response) => {
    accesDonnees=="mock" ? FetchDonnees.findFromMockById(req, res,'evenements') :  'bdd' ;
  });   
  
    
  router.get('/experts/:id/:photo', (req:Request, res:Response) => {  
    accesDonnees=="mock" ? FetchDonnees.findFromMockById(req, res,'evenements') :  'bdd' ;
  });    
  
  
   
  
  
  router.get('/illustrations/:name', (req:Request, res:Response) => {
        FetchDonnees.getImage(res,req,`../assets/Images/Illustrations/Default-Images`);
    });
  
  
  router.get('/photos/:name', (req:Request, res:Response) => {
   
        FetchDonnees.getImage(res,req,`../../public/images/Photos`);
    });
     

module.exports = router ;
