
import { ManageDonnees } from '../Services/manageDonnees.service.ts'
import { User } from "../Entitees/Entites/User.ts";
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';    

export class authentificationController{
 
    private _user?: User | undefined;
  

 
  
   constructor(...args:any){

     let nb=args.length;
     
     switch(nb){
      case 0:()=>{};break;
      case 1:this._user=args[0];break;
     }


   }  

   public findUserIdForIdentifiantFromMock(req: Request, res: Response,idenfifiant:string):number|undefined{
    let manageDonnees = new ManageDonnees('users');
   return manageDonnees.findIdFromMockByIdentifiant(req, res,idenfifiant);        

 
   }  

  
   public validateAuthentification(req: Request, res: Response,identifiant:string,password:string,typePersistance:string):boolean{
      
      let manageDonnees = new ManageDonnees('users');
      let user:JSON|undefined=manageDonnees.findFromMockByIdentifiant(req, res,identifiant);

      // console.log("authentificationController L38 test authentificationController user from file : ",user);
      
      if (user != undefined){   
      this.User= User.JsonToUser(user);    
      }  
    
      
      if (password === this.User?.password){return true;}
      
      return false;  
   }


   public createToken(userId:number){
      // /!\ssl-keygen provoque une erreur la clef n'est pas considérée comme asynchrone par jwt
      // Mieux vaut générer la clef avec openssh directement
       
      const RSA_PRIVATE_KEY = fs.readFileSync((global as any) .APP_ROOT_PATH+'/Configuration/Securite/Certificate/Authentification/privateKey.key');
      
      const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: userId.toString()
      });
      return jwtBearerToken;
      }
  
  
   public getUserIdFromToken(token:string):Number{
      let res!:Number;
      const decoded=jwt.decode(token) as {sub:string};
       if(decoded!=null || decoded != undefined){
            // In JWT sub is a standard claim that represents the subject of the token
            res= Number(decoded);
         }         
       else{console.error("authentificationController L47","L'userId n'a pas été récupéré.");}
       return res;
   }

  
   public get User(): User | undefined {
      return this._user;
   }
   public set User(value: User | undefined) {
      this._user = value;
   }
 
}