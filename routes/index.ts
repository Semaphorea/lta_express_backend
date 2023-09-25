import {Request,Response} from 'express';
import fs from 'fs';
import { ManageDonnees } from '../src/Services/manageDonnees.service';
import { ExpertiseController } from '../src/Controllers/expertiseController';
import { Expertise } from '../src/Entitees/Entites/Expertise';
import { ParsedQs } from 'qs';

const bodyParser = require('body-parser');
var express = require('express'); 
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

let accesDonnees='mock';
    
/* GET home page. */
router.get('/', function(req:Request, res:Response, next:any) {
  res.render('index', { title: 'Express' });
});


const manageDonnees= new ManageDonnees();

/*GET Articles & Articles Id */ 
router.get('/articles', (req:Request,res:Response) => { 
       
      manageDonnees.instantiateProperties('articles'); 
      accesDonnees=="mock" ?  manageDonnees.findDonnees(res)  :  'bdd' ;
    })    
    
    
    router.get('/articles/:id', (req:Request, res:Response) => {    
     manageDonnees.instantiateProperties('articles'); 
     console.log(manageDonnees.typeElementJson);
     accesDonnees=="mock" ? manageDonnees.findFromMockById(req, res)  :  'bdd' ;
   } );


   
  /*GET Expert & Expert Id */ 
  router.get('/experts', (req:Request,res:Response) => {
     manageDonnees.instantiateProperties('experts'); 
     accesDonnees=="mock" ?   manageDonnees.findDonnees(res) :  'bdd' ;	
    })   
    
    router.get('/experts/:id', (req:Request, res:Response) => {
    manageDonnees.instantiateProperties('experts'); 
    accesDonnees=="mock" ?  manageDonnees.findFromMockById(req, res)  :  'bdd' ;}
    );
  
  
  /*GET Expertise & Expertise Id */
  router.get('/expertises', (req:Request,res:Response) => {
    manageDonnees.instantiateProperties('expertises'); 
    accesDonnees=="mock" ?  manageDonnees.findDonnees(res) :  'bdd' ;
        })  
  
  router.get('/expertises/:id', (req:Request, res:Response) => {
    manageDonnees.instantiateProperties('expertises'); 
    accesDonnees=="mock" ?   manageDonnees.findFromMockById(req, res) :  'bdd' ;
  });  


  /*GET Expertise Delete */ 
  router.get('/expertise/delete/:id', (req:Request,res:Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');    
     
  
    let ret:Boolean=false;
    let expController:ExpertiseController=new ExpertiseController();
     ret= expController.deleteExpertise(accesDonnees,Number.parseInt(req.params.id));    
     
     ret ? res.status(200).json("{ \"Expertise " +req.params.id+"\" : \"deleted\" }"):res.status(200).json("{ \"Expertise  " +req.params.id+"\" : \"no deleded\"}"); }      
   )  

  /*POST Expertise Last-Id */
  router.post('/expertise/last-id',(req:Request,res:Response)=>{

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    let expController:ExpertiseController=new ExpertiseController();
   
      let ret=expController.fetchLastId(accesDonnees);
      res.status(200).json({id:ret});
 


  })

  /*POST Expertise Submit-Form */
  router.post('/expertise/submit-form', async(req:Request,res:Response) => {
    let ret:Boolean=false;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
    //console.log("index.ts L58 :"+req.header('content')); 
    let requestValue:any=req.body

       console.log("index.ts L102",requestValue);
       //if(requestValue==undefined){requestValue=null;}
       let expertiseController=new ExpertiseController(); 


       //Les donnees d'expertise sont envoyés sans id
       let ex=expertiseController.setRequestExpertise(requestValue);      
      //  console.log('index.ts L108 /expertise/submit-form');   
      console.log('index.ts L112 : ',ex);  

       let promise:Promise<Boolean> = expertiseController.persist(accesDonnees);
       promise.then((rea)=>{ret=rea;res.status(200).json({'submit-form':ret});})  ;  
      
       }              
    )     
    

  /*POST Expertise Update*/
  router.post('/expertise/update', async(req:Request,res:Response) => {
    let ret:Boolean=false;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
    //console.log("index.ts L58 :"+req.header('content')); 
    let requestValue:any=req.query;

     if(requestValue==undefined){requestValue=null;}
       let expertiseController=new ExpertiseController(); 
       let ex=expertiseController.setRequestExpertise(req.query);      
      //console.log(ex);

       let promise:Promise<Boolean> = expertiseController.update(accesDonnees);
       promise.then((rea)=>{ret=rea;res.status(200).json("{\""+ret+"\"}");})  ;  
      
       }              
    )     
  /*POST Expertise */
  router.get('/expertise/submit-form', async(req:Request,res:Response) => {
    let ret:Boolean=false;
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');  
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    //console.log("index.ts L58 :"+req.header('content')); 
    let requestValue:any=req.query;
    
    if(requestValue==undefined){requestValue=null;}
    console.log("index.ts L148");  
    console.error(requestValue);
    let expertiseController=new ExpertiseController(); 
    let ex=expertiseController.setRequestExpertise(req.query);      
    console.log("index.ts L152");
    console.log(ex);

       let promise:Promise<Boolean> = expertiseController.persist(accesDonnees);
       promise.then((rea)=>{ret=rea;res.status(200).json("{\""+ret+"\"}");})  ;  
      
       }              
    )    


  /*GET Evenements & Evenements Id */
  router.get('/evenements', (req:Request,res:Response) => {	
    manageDonnees.instantiateProperties('evenements'); 
    accesDonnees=="mock" ?   manageDonnees.findDonnees(res) :  'bdd' ;
  })   
  
  router.get('/evenements/:id', (req:Request, res:Response) => {
    manageDonnees.instantiateProperties('evenements'); 
    accesDonnees=="mock" ? manageDonnees.findFromMockById(req, res) :  'bdd' ;
  });   
  
  
  router.get('/experts/:id/:photo', (req:Request, res:Response) => {  
    manageDonnees.instantiateProperties('experts'); 
    accesDonnees=="mock" ? manageDonnees.findFromMockById(req, res) :  'bdd' ;
  });      
  
  
  router.get('/illustrations/:name', (req:Request, res:Response) => {
        manageDonnees.getImage(res,req,`../../assets/images/Illustrations/Default-Images`);
    }); 
  
  
  router.get('/photos/:name', (req:Request, res:Response) => {
    
        manageDonnees.getImage(res,req,`../../assets/images/Photos`);
    });
     

module.exports = router ;
