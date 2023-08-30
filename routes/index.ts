import {Request,Response} from 'express';
import fs from 'fs';
import { FetchDonnees } from '../src/Services/fetchDonnees.service';
import { ExpertiseController } from '../src/Controllers/expertiseController';
import { Expertise } from '../src/Entitees/Entites/Expertise';
import { ParsedQs } from 'qs';

//import { resolve } from 'path';
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

  /*POST Expertise */
  router.post('/expertise/submit-form', async(req:Request,res:Response) => {
    let ret:Boolean=false;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
    //console.log("index.ts L58 :"+req.header('content')); 
    let requestValue:any=req.query;

     if(requestValue==undefined){requestValue=null;}
       let expertiseController=new ExpertiseController();

       //let ex=expertiseController.main(req.query);    
       let ex=expertiseController.setRequestExpertise(req.query);    
   
      // console.log(ex);
       let promise:Promise<Boolean> = expertiseController.persist(accesDonnees);
       promise.then((rea)=>{ret=rea;res.status(200).json("{\""+ret+"\"}");})  ;  
      
       }              
    )     
  

  //  router.post('/expertise/submit-form', async(req:Request,res:Response) => {
  //   let ret=false;

  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Methods', 'POST');
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
  //   //console.log("index.ts L58 :"+req.header('content')); 
     
  //   if (accesDonnees=="mock" ){(ret=await persistDonnees.persist(req.query,accesDonnees)
  //                                                   .then(()=>{return true;})
  //                                                   .catch((err:any)=>{console.error("Route : /expertise/submit-form - Request failed to post datas !");return false;})
  //      )}
  //  else {  'bdd' ;} 
   
  //   res.status(200).json("{\""+ret+"\"}"); }         
  //  )  


   router.get('/expertise/delete', (req:Request,res:Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');   
    
  
    let ret=false;
   // accesDonnees=="mock" ?  persistDonnees.persist(req.body,accesDonnees) :  'bdd' ; 
   
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
