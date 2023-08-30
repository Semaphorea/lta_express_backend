
import {Request,Response} from 'express';
import fs from 'fs';  
const path =  require('path');  
let articles =   require ('../mock/articles.json');
let evenements = require ('../mock/evenements.json');
let expertises = require ('../mock/expertises.json');
let experts =    require ('../mock/experts.json');


 export class FetchDonnees{


/**
 * findFromMockById
 * @param req 
 * @param res 
 * @param donnees 
 * @param SearchParameter 
 */
  findFromMockById(req:Request, res:Response,donnees:string){
   const id = parseInt(req.params.id);
   
   //Récupération du type d'element à chercher ex: article
    let jsonElement=donnees;
          
          try {
    
           const jsonObject = JSON.parse('\"'+jsonElement+'\"');
           
           let elements:any;
                       if(donnees=="articles"){ elements = JSON.parse(JSON.stringify(articles)); }
                  else if(donnees=="evenements"){ elements = JSON.parse(JSON.stringify(evenements)); }
                  else if(donnees=="experts"){ elements = JSON.parse(JSON.stringify(experts)); }
                  else if(donnees=="expertises"){ elements = JSON.parse(JSON.stringify(expertises)); }
                   
                    const elementsArray = Object.values(elements[jsonObject]);
                    const el = elementsArray.find((element:any) => { return element.id === id; });
                    res.status(200).json(el);  
            
         } catch (error:any) {
           console.error('Error parsing JSON:', error);
         }
            
  
       } 
 
   
   findDonnees(res:Response,donnees:string){
    switch(donnees){
      case 'articles' : return res.status(200).json(articles); break;
      case 'evenements': return res.status(200).json(evenements);break;
      case 'experts':  return res.status(200).json(experts);break;
      case 'expertises': return res.status(200).json(expertises);break;
    }
     
  }
 
   getImage(res:Response,req:Request,apath:String):void{
     const nameImage = req.params.name;   
     const imagePath = path.join(__dirname, apath,nameImage);
     //  console.log(__dirname);
     //  console.log(imagePath);
    
      // Use the 'fs' module to check if the donnees exists before sending it
      fs.access(imagePath, fs.constants.F_OK, (err:any) => {
        if (err) {
          res.status(404).send('Image not found');
        } else {
          res.sendFile(imagePath);
        }
    });


  }}
