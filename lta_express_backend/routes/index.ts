
  
import express,{ Express,Request,Response, NextFunction } from "express";
const path = require('path');
const cors = require('cors'); 
const  fs = require('fs');
  
const router = express.Router();
 
 
const articles = require ('../mock/articles.json');
const evenements = require ('../mock/evenements.json');
const expertises = require ('../mock/expertises.json');
const experts = require ('../mock/experts.json');
const accesDonnees = 'mock'

// Use cors middleware to handle CORS
router.use(cors());   


/**
 * findFromMockById
 * @param req 
 * @param res 
 * @param file 
 * @param SearchParameter 
 */
function findFromMockById(req:Request, res:Response,file:string){
  const id = parseInt(req.params.id);
  let jsonElement;
  
  //Récupération du type d'element à chercher
  try{
      const pattern= 'mock/\(.*)\.json$' ;
      let  typeSearchElement = file.match(pattern);
      
      if (typeSearchElement && typeSearchElement[1]) {
        jsonElement=typeSearchElement[1];
           //console.log('L38 : ' + jsonElement);

         try {


          const jsonObject = JSON.parse('\"'+jsonElement+'\"');
          //console.log("index.ts L45 :" ); 
          //console.log(jsonObject);  



          fs.readFile(file, 'utf8', (err:any, data:any) => {

            if (err) { console.error(err);
                        res.status(500).json({ error: 'Internal Server Error' });
                       return; 
                      } 
                   const elements = JSON.parse(data); 
                  //  console.log("index.ts L56 : ")
                  //  console.log(elements);  
                  //  console.log("index.ts L59 : ")          
                  //  console.log(jsonObject);
                   const elementsArray = Object.values(elements[jsonObject]);
                   const el = elementsArray.find((element:any) => { return element.id === id; });
                  //  console.log('index.ts L62 Element trouvé : '+el); 
                   res.status(200).json(el); 
         });


        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
           

      } else {
        console.log('No match found');
      }

  }catch(error:any){console.error('index.ts,L36  Le regex pattern ne retourne aucun element. Aucun fichier ne peut être lu.')}


 

}







/* GET home page. */
router.get('/', ( req:Request,res:Response) =>{
  accesDonnees=="mock" ?   res.render('index', { title: 'Express' }) :  'bdd' ;


});

/*GET Articles & Articles Id */
router.get('/articles', (req:Request,res:Response) => {	
  accesDonnees=="mock" ?   res.status(200).json(articles) :  'bdd' ;
           })   

router.get('/articles/:id', (req:Request, res:Response) => {
  accesDonnees=="mock" ?  findFromMockById(req, res,'./mock/articles.json')  :  'bdd' ;
 } );


/*GET Expert & Expert Id */
router.get('/experts', (req:Request,res:Response) => {
   accesDonnees=="mock" ?   res.status(200).json(experts) :  'bdd' ;	
})   
 
router.get('/experts/:id', (req:Request, res:Response) => {
  accesDonnees=="mock" ?  findFromMockById(req, res,'./mock/experts.json')  :  'bdd' ;}
  );


/*GET Expertise & Expertise Id */
router.get('/expertises', (req:Request,res:Response) => {
  accesDonnees=="mock" ?  res.status(200).json(expertises) :  'bdd' ;
  	})  

router.get('/expertises/:id', (req:Request, res:Response) => {
  accesDonnees=="mock" ?   findFromMockById(req, res,'./mock/expertises.json') :  'bdd' ;
});

/*GET Evenements & Evenements Id */
router.get('/evenements', (req:Request,res:Response) => {	
  accesDonnees=="mock" ?   res.status(200).json(evenements) :  'bdd' ;
})   

router.get('/evenements/:id', (req:Request, res:Response) => {
  accesDonnees=="mock" ? findFromMockById(req, res,'./mock/evenements.json') :  'bdd' ;
});   

  
router.get('/experts/:id/:photo', (req:Request, res:Response) => {

  accesDonnees=="mock" ? findFromMockById(req, res,'./mock/evenements.json') :  'bdd' ;
});    





router.get('/illustrations/:name', (req, res) => {
  const nameImage = req.params.name;
  console.log(__dirname);
  const imagePath = path.join(__dirname, '..','assets', 'Images', 'Illustrations','Default-Images', nameImage);
  console.log(imagePath);
    // Use the 'fs' module to check if the file exists before sending it
    fs.access(imagePath, fs.constants.F_OK, (err:any) => {
      if (err) {
        res.status(404).send('Image not found');
      } else {
        res.sendFile(imagePath);
      }
    });
  });


router.get('/photos/:name', (req:Request, res:Response) => {
  const nameImage = req.params.name;
  console.log(__dirname);
  const imagePath = path.join(__dirname, '..','assets', 'Images', 'Photos', nameImage);
  console.log(imagePath);
    // Use the 'fs' module to check if the file exists before sending it
    fs.access(imagePath, fs.constants.F_OK, (err:any) => {
      if (err) {
        res.status(404).send('Image not found');
      } else {
        res.sendFile(imagePath);
      }
    });
});
  


module.exports = router;
