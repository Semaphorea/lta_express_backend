import { UserType } from "../Types/UserType";
import { Address } from "./Address";
import { Personne } from "./Interface/Personne";
export class User implements UserType{



   constructor( 
     private _id: number,
     private _id_personne: number,
     private _identifiant: string,
     private _password: string
     ){
     
      this.id=_id;
      this.identifiant=_identifiant;
      this.password=_password;  
      this.id_personne=_id_personne;
        
     }

   
     public static JsonToUser(object:JSON){ 
      let obj= JSON.parse(JSON.stringify(object));       

     
      //console.log("User.ts L25 test  User object : ",object);  "il y a une propriété photos:true"      

      if ("id" in obj && "identifiant" in object  && "password" in object
      && "id_personne" in object  ) {
        let user=new User (obj.id,obj.id_personne,obj.identifiant,obj.password);    
        // console.log("User.ts , JsonToUser L32",user);  
          return  user;  
      }
          } 

          public get id_personne(): number {
            return this._id_personne;
          }
          public set id_personne(value: number) {
            this._id_personne = value;
          }
          public get password(): string {
            return this._password;
          }
          public set password(value: string) {
            this._password = value;
          }
          public get identifiant(): string {
            return this._identifiant;
          }
          public set identifiant(value: string) {
            this._identifiant = value;
          }
          public get id(): number {
            return this._id;
          }
          public set id(value: number) {
            this._id = value;
          }
        
         

}