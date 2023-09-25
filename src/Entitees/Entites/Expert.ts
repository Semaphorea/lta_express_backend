import { Personne } from "./Interface/Personne";
import { Address } from './Address' ;
import { Photo } from './Photo' ;

  
export class Expert implements Personne{
    id : number ; 
    name:string ;
    firstname : string ;
    address:Address ;
    diplomes : string[];
    experiences : string[] ; 
    email : string ;
    phoneNumber : string ;
    photo: Photo | null ;
    
   constructor( 
                id : number , 
                name:string ,
                firstname : string ,
                address:Address ,  
                diplomes:string[],
                experiences:string[],
                email : string ,
                phoneNumber : string ,
                photo : Photo |null
){ 

    this.id = id ;
    this.name = name ;
    this.firstname = firstname ;
    this.address= address ;
    this.diplomes = diplomes;
    this.experiences= experiences ; 
    this.email = email ;
    this.phoneNumber = phoneNumber ;
    this.photo = photo ;   
      
   }
}