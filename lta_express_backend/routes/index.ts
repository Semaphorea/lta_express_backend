
  
import express,{ Express,Request,Response, NextFunction } from "express";
import {ExpertType} from '../src/Entitees/Types/ExpertType';
const  fs = require('fs');
  
const router = express.Router();
 
 
const articles = require ('../mock/articles.json');
const evenements = require ('../mock/evenements.json');
const expertise = require ('../mock/expertise.json');
const expert = require ('../mock/experts.json');






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
           console.log('L26 : ' + jsonElement);

         try {
          const jsonObject = JSON.parse('\"'+jsonElement+'\"');
           // console.log(jsonObject);  

          fs.readFile(file, 'utf8', (err:any, data:any) => {
            if (err) { console.error(err);
                        res.status(500).json({ error: 'Internal Server Error' });
                       return; 
                             } 
                   const elements = JSON.parse(data); 
                  console.log(elements);  
                   const elementsArray = Object.values(elements.jsonObject);
                   const el = elementsArray.find((element:any) => { return element.id === id; });
                   console.log('L37 Element trouvé : '+el); 
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

router.get('/articles/:id', (req:Request, res:Response) => ( findById(req, res,'articles.json') ));


/*GET Expert & Expert Id */
router.get('/expert', (req:Request,res:Response) => (	res.status(200).json(expert)))   
 
router.get('/expert/:id', (req:Request, res:Response) => ( findById(req, res,'./mock/experts.json') ));



/*GET Expertise & Expertise Id */
router.get('/expertise', (req:Request,res:Response) => {	res.status(200).json(expertise)})  

router.get('/expertise/:id', (req:Request, res:Response) => ( findById(req, res,'expertise.json') ));

/*GET Evenements & Evenements Id */
router.get('/evenements', (req:Request,res:Response) => {	res.status(200).json(evenements)})   

router.get('/evenements/:id', (req:Request, res:Response) => ( findById(req, res,'evenements.json') ));


  





module.exports = router;
