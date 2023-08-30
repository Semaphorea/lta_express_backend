import {Request,Response} from 'express';
import fs from 'fs';
import { FetchDonnees } from '../src/Services/fetchDonnees.service';
import { PersistDonnees } from '../src/Services/persistDonnees.service';
const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
let accesDonnees='mock';
 
/* GET home page. */
router.get('/', function(req:Request, res:Response, next:any) {
  res.render('index', { title: 'Express' });
});

const fetchDonnees= new FetchDonnees();
const persistDonnees= new PersistDonnees();

/*GET Articles & Articles Id */ 
  router.get('/articles', (req:Request,res:Response) => { 	
      accesDonnees=="mock" ?  fetchDonnees.findDonnees(res,'articles')  :  'bdd' ;
  })    


  router.get('/articles/:id', (req:Request, res:Response) => {    
     accesDonnees=="mock" ? fetchDonnees.findFromMockById(req, res,'articles')  :  'bdd' ;
   } );


   
  /*GET Expert & Expert Id */ 
  router.get('/experts', (req:Request,res:Response) => {
    
     accesDonnees=="mock" ?   fetchDonnees.findDonnees(res,'experts') :  'bdd' ;	
  })   
   
  router.get('/experts/:id', (req:Request, res:Response) => {
    accesDonnees=="mock" ?  fetchDonnees.findFromMockById(req, res,'experts')  :  'bdd' ;}
    );
  
  
  /*GET Expertise & Expertise Id */
  router.get('/expertises', (req:Request,res:Response) => {
    accesDonnees=="mock" ?  fetchDonnees.findDonnees(res,'expertises') :  'bdd' ;
        })  
  
  router.get('/expertises/:id', (req:Request, res:Response) => {
    accesDonnees=="mock" ?   fetchDonnees.findFromMockById(req, res,'expertises') :  'bdd' ;
  });  

  router.post('/expertise/submit-form', (req:Request,res:Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
    //console.log("index.ts L58 :"+req.header('content')); 
     
   
    let ret=false; 
  
    accesDonnees=="mock" ?( ()=>{persistDonnees.persist(req.query,accesDonnees).then(()=>{ret= true;})})():  'bdd' ; 
   
    res.status(200).json("{\'"+ret+"\'}"); }         
   )  
  




   router.get('/expertise/submit-form', (req:Request,res:Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');   
    
    console.log(req.body); 
    let ret=false;
    accesDonnees=="mock" ?  persistDonnees.persist(req.body,accesDonnees) :  'bdd' ; 
   
    res.status(200).json("{\'"+ret+"\'}"); }      
   )  



  /*GET Evenements & Evenements Id */
  router.get('/evenements', (req:Request,res:Response) => {	
    accesDonnees=="mock" ?   fetchDonnees.findDonnees(res,'evenements') :  'bdd' ;
  })   
  
  router.get('/evenements/:id', (req:Request, res:Response) => {
    accesDonnees=="mock" ? fetchDonnees.findFromMockById(req, res,'evenements') :  'bdd' ;
  });   
  
    
  router.get('/experts/:id/:photo', (req:Request, res:Response) => {  
    accesDonnees=="mock" ? fetchDonnees.findFromMockById(req, res,'evenements') :  'bdd' ;
  });      
  
  
  router.get('/illustrations/:name', (req:Request, res:Response) => {
        fetchDonnees.getImage(res,req,`../../assets/images/Illustrations/Default-Images`);
    }); 
  
  
  router.get('/photos/:name', (req:Request, res:Response) => {
   
        fetchDonnees.getImage(res,req,`../../assets/images/Photos`);
    });
     

module.exports = router ;