
import { ArticleType } from '../Types/ArticleType';

 
export class Article implements ArticleType{

    

    public id: number | null;
    public title: string | null;
    public description: string | null;
    public url: string | null;
    public availableUnits: number | null;
    public year: number | null;
    public price: number | null;
 
    public constructor(id: number, title: string, description: string, photo_url: string, availableUnits: number, year: number, price: number) {
    
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = photo_url;
        this.availableUnits = availableUnits;
        this.year = year;
        this.price = price;

    }  


  

}