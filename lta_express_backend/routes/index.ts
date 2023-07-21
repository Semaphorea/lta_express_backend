import express,{ Express,Request,Response, NextFunction } from "express";
import {ExpertType} from '../src/Entitees/Types/ExpertType';
const  fs = require('fs');

const router = express.Router();

 
const expertise = require ('../mock/expertise.json');
const expert = require ('../mock/expert.json');



//console.log(expert.stringify());

/* GET home page. */
router.get('/', ( req:Request,res:Response, next:NextFunction) =>{
  res.render('index', { title: 'Express' }); 
});

/*GET Expert & Expert Id */
router.get('/expert', (req:Request,res:Response) => {	res.status(200).json(expert)})   



router.get('/expert/:id', (req:Request, res:Response) => { const id = parseInt(req.params.id);
                                          fs.readFile('./mock/expert.json', 'utf8', (err:any, data:any) => {
                                           if (err) { console.error(err);
                                                       res.status(500).json({ error: 'Internal Server Error' });
                                                      return; 
                                                            } 
                                                  const elements = JSON.parse(data); 
                                                  console.log(elements);
                                                  const elementsArray = Object.values(elements.expert);
                                                  const el = elementsArray.find((element:any) => { return element.id === id; });
                                                 // console.log(el);
                                                 res.status(200).json(el);
                                        }); 
                                       });



  
router.get('/expertise', (req:Request,res:Response) => {	res.status(200).json(expertise)})  



router.get('/expertise/:id', (req:Request, res:Response) => { const id = parseInt(req.params.id);
  fs.readFile('./mock/expertise.json', 'utf8', (err:any, data:any) => {
   if (err) { console.error(err);
               res.status(500).json({ error: 'Internal Server Error' });
              return; 
                    } 
          const elements = JSON.parse(data); 
          console.log(elements);
          const elementsArray = Object.values(elements.expertise);
          const el = elementsArray.find((element:any) => { return element.id === id; });
          console.log('Element trouvé : '+el); 
          res.status(200).json(el);
}); 
});


 






// Mount the router middleware
// app.use(router)


module.exports = router;
