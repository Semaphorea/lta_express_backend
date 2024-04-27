import { Photo } from "../Entites/Photo.ts";
import { PhotoType } from "./PhotoType.ts";

export type EvenementType = {  

    id: number | null ;  
    title: string| null ;   
    date : Date [] | null; 
    description : string| null ; 
    photo: Photo| null ;     
}