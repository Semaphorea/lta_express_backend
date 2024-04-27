
import { ArticleType } from '../Types/ArticleType.ts';

  
export class Article implements ArticleType{

    

    public id: number | null;
    public title: string | null;
    public description: string | null;
    public url: string | null;
    public availableUnits: number | null;
    public quantity:number|null;
    public year: number | null;  
    public price: number | null;  
 
    public constructor(id: number, title: string, description: string, photo_url: string, availableUnits: number,quantity:number, year: number, price: number) {
    
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = photo_url;
        this.availableUnits = availableUnits;
        this.quantity = quantity;
        this.year = year;
        this.price = price;

    }  


  

}