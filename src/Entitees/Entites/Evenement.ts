
import { EvenementType } from '../Types/EvenementType';

export class Evenement implements EvenementType { 

    id: number | null ;  
    title: string| null ;   
    date : Date [] | null; 
    description : string| null ; 
    photo: string| null ;

    public constructor (
        id: number | null ,  
        title: string| null ,   
        date : Date [] | null, 
        description : string| null , 
        photo: string| null ,  
    ) {
      
        this.id = id ;
        this.title=title ;   
        this.date=date ; 
        this.description=description  ; 
        this.photo=photo ; 

    }
}