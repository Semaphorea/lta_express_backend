
import { ManageDonnees } from '../Services/manageDonnees.service'
import {Expertise } from "../Entitees/Entites/Expertise";
import QueryString from 'qs';
import  querystring from "querystring";
import  ParsedUrlQuery from "querystring";
import { ParsedQs } from 'qs';
export class ExpertiseController{

public _expertise?:Expertise;

  constructor(...args:any){
    let nbargs:Number =args.lenght;
    switch(nbargs){
      case 0:()=>{} ;break;
      case 1:(expertise:Expertise)=>{this._expertise=expertise;}
    }
    
  }
    public deleteExpertise(typePersistance:string,id:Number):Boolean{
      let manageDonnees=new ManageDonnees();
      manageDonnees.instantiateProperties('expertises'); 
      return  manageDonnees.delete(id); 
    }

    public main (){}  


    public processExpertise(){}

  
    public async persist(typePersistance:string){
      
          let manageDonnees=new ManageDonnees('expertises');
          console.log("expertiseController L35",this.expertise);
            let ret=await manageDonnees.persist(this.expertise,typePersistance)
                                                    .then(()=>{return true;})
                                                    .catch((err:any)=>{console.error("Route : /expertise/submit-form - Request failed to post requestValue !");return false;})
              return ret;                
    }
                               
   public async update(typePersistance:string){
          return this.persist(typePersistance);

   }
   

    public fetchExpertiseDB(){}

    public fetchLastId(typePersistance:string):Number{
      let manageDonnees=new ManageDonnees('expertises'); 
      let ret= manageDonnees.getLastId(typePersistance);
      return ret;
    }

    public setRequestExpertise(requestValue: any){
      console.log('expertiseController 57 : ',requestValue);   
      let expertise= new Expertise(requestValue._id, requestValue._email,requestValue._articleName,requestValue._features, requestValue._defaults, requestValue._signature, 
        requestValue._author, requestValue._creationYear, requestValue._firstCommercializationYear, requestValue._photos, requestValue._estimatedPrice, requestValue._assessment);
        this._expertise=expertise;      
        
        console.log('expertiseController 61 : ',this._expertise);   
             return expertise; 
     }



    public get expertise():Expertise | null | undefined{return this._expertise;}
    public set expertise(expertise:Expertise){
          this._expertise=expertise;   

    }
  


  



}