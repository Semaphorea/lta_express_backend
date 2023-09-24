
import {Request,Response} from 'express';
import fs from 'fs';  
import { Expertise } from '../Entitees/Entites/Expertise';
import { JsonFileController } from '../Controllers/jsonFileController';
import {lastValueFrom,from} from   'rxjs';
const path =  require('path');  
let articles =   require ('../mock/articles.json');
let evenements = require ('../mock/evenements.json');
let expertises = require ('../mock/expertises.json');
let experts =    require ('../mock/experts.json');
 
export class ManageDonnees{

    private _typeElementJson?: string;
    private _file: any; 
   private  jsonFileController?:JsonFileController;
   
    constructor(...args:any){
       let nbargs:Number=args.length;
       
       switch(nbargs){
        case 0: ()=>{} ; break;
        case 1: (()=>{ this.instantiateProperties(args[0]);})();break;                     
       } 
    }
  

/**Fonctions de Récupération  */    

/**
 * findFromMockById
 * @param req 
 * @param res 
 * @param donnees 
 * @param SearchParameter 
 */
findFromMockById(req:Request, res:Response){
    const id = parseInt(req.params.id);
    
    
    
    try {
              
            //Récupération du type d'element à chercher ex: article
            const jsonObject = JSON.parse('\"'+this.typeElementJson+'\"');
            
            let elements:any;
                 elements = JSON.parse(JSON.stringify(this.file));               
                    
                     const elementsArray = Object.values(elements[jsonObject]);
                     const el = elementsArray.find((element:any) => { return element.id === id; });
                     res.status(200).json(el);  
             
          } catch (error:any) {
            console.error('Error parsing JSON:', error);
          }
             
   
        } 
  
    
    findDonnees(res:Response){
       
             return res.status(200).json(this.file); 
  
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
 
 
   }


/**Fonctions de Persistance */


//Persistence en fin de fichier
async persist(datas:any,mode:string):Promise<any>{

       console.log("manageDonnees.services L99",datas);
        
       let res:boolean= false;    
        let typeElement=this.typeElementJson?this.typeElementJson:'';
        let filecontroller=new JsonFileController(this.file,typeElement); 
     
       
        let toRecord:string;

        console.log("manageDonnees.service.ts L105 : ",datas.photos);
        datas.photos=JSON.parse(JSON.stringify(datas.photos));
        console.log("manageDonnees.service.ts L107 : ",datas.photos);
        console.log("manageDonnees.service.ts L107 : ",datas);
        
                console.log('manageDonnees.service L110 : ',typeof datas);
               toRecord = datas; 
                
            
            
            
            
            
            if(mode ==='mock'){
                 
                console.log("manageDonnees.service L120 ",mode);
                console.log("manageDonnees.service L121",datas);
                
                //Remplacement des key de l'objet pour ne pas avoir '_' dans le fichier.
               
                const newDatas :any= {};
                for (let key in datas) {
                  let newKey = key.startsWith('_') ? key.substring(1) : key;
                  newDatas[newKey] = datas[key];
                }
              console.log('manageDonnees.service L131 ',newDatas); 
              
                newDatas.id!=null && datas.id!=undefined && filecontroller.checkIdExistence(typeElement,newDatas.id)==false ? filecontroller.writeFileId(newDatas.id,newDatas)   :   filecontroller.writeEndFile(newDatas);   
                res=true;  
                //     console.error('manageDonnees.service.ts L136 : ', toRecord );
            }  
            else if (mode === 'bdd'){console.log("persistDonnees.service L26 : Persistance en BDD"); return true;}
            else{console.error("persistDonnees.service L26 : Your Datas have not been saved !");return false;}
            
            //console.log(file.getLastId());
            //déclenchement d'Event.
            //avec envoi des données par mail à l'expert et en cc au client.  
            
    return res;

    
}







/**Fonctions de Suppression */
public delete(id:Number):Boolean{
       this._file;

       try {
              
        //Récupération du type d'element à chercher ex: article
        const jsonObject = JSON.parse('\"'+this.typeElementJson+'\"');
        
                  let elements:any;
                  elements = JSON.parse(JSON.stringify(this.file));               
                
                  let elementsArray = Object.values(elements[jsonObject]);                 
                
                   elementsArray =  elementsArray.filter((values:any)=>{if (values.id != id ){return values;} })

                 //  let i:number = 0;                   
                  // elementsArray= elementsArray.map((values:any)=>{values.id=i; i++;}); 

                   let res:boolean= false;     
                   let filecontroller=new JsonFileController(this.file,this.typeElementJson?this.typeElementJson:'');
                   let fi=JSON.stringify(elementsArray);
                   let out="{\"expertises\":"+fi+"}";  
                   console.log(out);
                   filecontroller.writeFile(JSON.parse(out)); 
              
             return true;
         
      } catch (error:any) {
        console.error('Error parsing JSON:', error);
        return false;
      }

}

public getLastId(typePersistance:string):Number{  
  let res!:Number;

      try{
       if(typePersistance=='mock'){
        const jsonObject = JSON.parse('\"'+this.typeElementJson+'\"');

           let elements:any;
                  elements = JSON.parse(JSON.stringify(this.file));     
                  let elementsArray:any = Object.values(elements[jsonObject]);  
                  let nbElement=elementsArray.length;
                  res=  elementsArray[nbElement-1].id;

       }
       else{console.log('manageDonnees.service.ts L200 : TODO : BDD management')};

      }catch(error:any){console.error("manageDonnees.service L206 Erreur :"+error);}

       return res;

}

public instantiateProperties(typeElementJson:string){
    this._typeElementJson=typeElementJson;
    switch(typeElementJson)
    {
     case 'articles' : this.file=articles;break;
     case 'evenements' : this.file=evenements;break; 
     case 'expertises': this.file=expertises;break;  
     case 'experts': this.file=experts; break}
    }   
  



public get file(): any {
    return this._file;
}
public set file(value: any) {
    this._file = value;
}
public get typeElementJson(): string|undefined {
    return this._typeElementJson;
}
public set typeElementJson(value: string) {
    this._typeElementJson = value;
}


}