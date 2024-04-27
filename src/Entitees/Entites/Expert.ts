import { Personne } from "../Types/Personne.ts";
import { Address } from './Address.ts' ;
import { Photo } from './Photo.ts' ;

  
export class Expert implements Personne{
    id : number ; 
    name:string ;
    firstname : string ;
    lastname: string;
    address:Address ;
    diplomes : string[];
    experiences : string[] ; 
    emailAddress : string ;
    phoneNumber : string ;
    photo: Photo | null ;  
    
    constructor( 
                id : number , 
                name:string ,
                firstname : string ,
                lastname: string,
                address:Address ,  
                diplomes:string[],
                experiences:string[],
                emailAddress : string ,
                phoneNumber : string ,
                photo : Photo |null
    ){ 
    this.id = id ;
    this.name = name ;
    this.firstname = firstname ;
    this.lastname=lastname ;  
    this.address= address ; 
    this.diplomes = diplomes;
    this.experiences= experiences ; 
    this.emailAddress = emailAddress ;
    this.phoneNumber = phoneNumber ;
    this.photo = photo ;          
   }
}