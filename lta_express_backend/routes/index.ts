
  
import express,{ Express,Request,Response, NextFunction } from "express";
const cors = require('cors'); 
const  fs = require('fs');
  
const router = express.Router();
 
 
const articles = require ('../mock/articles.json');
const evenements = require ('../mock/evenements.json');
const expertises = require ('../mock/expertises.json');
const experts = require ('../mock/experts.json');


// Use cors middleware to handle CORS
router.use(cors());   



/**
 * FindById
 * @param req 
 * @param res 
 * @param file 
 * @param SearchParameter 
 */
function findById(req:Request, res:Response,file:string){
  const id = parseInt(req.params.id);
  let jsonElement;
  
  //Récupération du type d'element à chercher
  try{
      const pattern= 'mock/\(.*)\.json$' ;
      let  typeSearchElement =file.match(pattern);
      
      if (typeSearchElement && typeSearchElement[1]) {
        jsonElement=typeSearchElement[1];
           console.log('L38 : ' + jsonElement);

         try {


          const jsonObject = JSON.parse('\"'+jsonElement+'\"');
          console.log("index.ts L45 :" ); 
          console.log(jsonObject);  



          fs.readFile(file, 'utf8', (err:any, data:any) => {

            if (err) { console.error(err);
                        res.status(500).json({ error: 'Internal Server Error' });
                       return; 
                      } 
                   const elements = JSON.parse(data); 
                   console.log("index.ts L56 : ")
                   console.log(elements);  
                   console.log("index.ts L59 : ")          
                   console.log(jsonObject);
                   const elementsArray = Object.values(elements[jsonObject]);
                   const el = elementsArray.find((element:any) => { return element.id === id; });
                   console.log('index.ts L62 Element trouvé : '+el); 
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
router.get('/', ( req:Request,res:Response, next:NextFunction) =>{
  res.render('index', { title: 'Express' }); 
});

/*GET Articles & Articles Id */
router.get('/articles', (req:Request,res:Response) => {	res.status(200).json(articles)})   

router.get('/articles/:id', (req:Request, res:Response) => ( findById(req, res,'./mock/articles.json') ));


/*GET Expert & Expert Id */
router.get('/experts', (req:Request,res:Response) => (	res.status(200).json(experts)))   
 
router.get('/experts/:id', (req:Request, res:Response) => ( findById(req, res,'./mock/experts.json') ));



/*GET Expertise & Expertise Id */
router.get('/expertises', (req:Request,res:Response) => {	res.status(200).json(expertises)})  

router.get('/expertises/:id', (req:Request, res:Response) => ( findById(req, res,'./mock/expertises.json') ));

/*GET Evenements & Evenements Id */
router.get('/evenements', (req:Request,res:Response) => {	res.status(200).json(evenements)})   

router.get('/evenements/:id', (req:Request, res:Response) => ( findById(req, res,'./mock/evenements.json') ));  


  





module.exports = router;
