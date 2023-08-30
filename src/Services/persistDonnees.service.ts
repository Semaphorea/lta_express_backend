
import {Request,Response} from 'express';
import fs from 'fs';  
import { Expertise } from '../Entitees/Entites/Expertise';
import { JsonFileController } from '../Controllers/jsonFileController';
let expertises = require ('../mock/expertises.json');
const path =  require('path');  


export class PersistDonnees{

    private _typeElementJson?: string;
    private _file: any;
  
   
    constructor(...args:any){
       let nbargs:Number=args.length;
       switch(nbargs){
        case 0: ()=>{} ; break;
        case 1: (typeElementJson:string)=>{this._typeElementJson=typeElementJson};break;
        case 2: (typeElementJson:string, file:any)=>{this._file=file,this._typeElementJson=typeElementJson};break;
       }

    }



async persist(datas:any,mode:string):Promise<any>{

    
    let res:boolean= false;    
    let filecontroller=new JsonFileController(this.file,'expertise'); 
    
    
        
         let id= (await filecontroller.getLastId().then((donnees:Number)=>{return donnees;})).valueOf();  
         
  
        let expertise= new Expertise(id+1, datas.email,datas.articleName,datas.features, datas.defaults, datas.signature, 
            datas.author, datas.creationYear, datas.firstCommercializationYear, datas.photos, datas.estimatedPrice, datas.assessment);
         if(expertise!=null){res=true;} 
        

         if(mode ==='mock'){
           
            let toRecord = expertise.toJsonString();
            // console.log("persistDonnees.service L35"+mode);
            // console.log(torecord);    
            return filecontroller.writeEndFile(filecontroller.file,JSON.parse(toRecord));   
        }  
         else if (mode === 'bdd'){console.log("persistDonnees.service L26 : Persistance en BDD"); return true;}
         else{console.error("persistDonnees.service L26 : Your Datas have not been saved !");return false;}

         //console.log(file.getLastId());
         //déclenchement d'Event.
         //avec envoi des données par mail à l'expert et en cc au client.  
       
    return res;
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