import {Adresse} from "../Entites/Interface/Adresse";
import {PhotoType} from "../Types/PhotoType"; 
export type ExpertType= {
    id : number ; 
    name:string ;
    firstname : string ;
    address:Adresse ;
    diplomes : string[];
    experiences : string[] ; 
    email : string ;
    phoneNumber : string ;
    photo: PhotoType | null 
}