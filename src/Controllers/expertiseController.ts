
import { PersistDonnees } from '../Services/persistDonnees.service'
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


  public main (){}  


    public processExpertise(){}

  
    public async persist(typePersistance:string){
      
          let persistDonnees=new PersistDonnees();
            let ret=await persistDonnees.persist(this._expertise,typePersistance)
                                                    .then(()=>{return true;})
                                                    .catch((err:any)=>{console.error("Route : /expertise/submit-form - Request failed to post requestValue !");return false;})
              return ret;                
    }
                               



    public fetchExpertiseDB(){}



    public setRequestExpertise (requestValue: any){

      let expert= new Expertise(null, requestValue?.email,requestValue?.articleName,requestValue?.features, requestValue?.defaults, requestValue?.signature, 
             requestValue?.author, requestValue?.creationYear, requestValue?.firstCommercializationYear, requestValue?.photos, requestValue?.estimatedPrice, requestValue?.assessment);
             this.expertise=expert;          
             return expert; 
     }



    public get expertise():Expertise | null | undefined{return this._expertise;}
    public set expertise(expertise:Expertise){
          this._expertise=expertise;   

    }
  


  



}