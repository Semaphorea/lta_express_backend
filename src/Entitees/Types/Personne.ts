import { Address } from '../Entites/Address.ts'

export interface Personne {
    id : number; 
    firstname : string;
    lastname:string;  
    address:Address ;
    emailAddress : string ;
    phoneNumber : string; 


}