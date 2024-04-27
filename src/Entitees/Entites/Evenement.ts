
import { EvenementType } from '../Types/EvenementType.ts';
import { PhotoType } from '../Types/PhotoType.ts';
import { Photo } from './Photo.ts';

export class Evenement implements EvenementType { 

    id: number | null ;  
    title: string| null ;   
    date : Date [] | null;   
    description : string| null ; 
    photo: Photo| null ;  

    public constructor (
        id: number | null ,  
        title: string| null ,   
        date : Date [] | null, 
        description : string| null , 
        photo: Photo| null ,  
    ) {
      
        this.id = id ;
        this.title=title ;     
        this.date=date ; 
        this.description=description  ; 
        this.photo=photo ;   

    }
    
   
   
}