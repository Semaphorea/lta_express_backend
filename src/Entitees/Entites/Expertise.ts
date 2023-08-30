import { Photo } from "./Photo";

export class Expertise {
   
  


    
    constructor(private _id ?:number|null|undefined,
                private _email ?: string | null|undefined, 
                private _articleName ?: string |null|undefined,
                private _features ?: string | null|undefined ,
                private _defaults ?: string | null|undefined ,
                private _signature ?: string | null |undefined ,
                private _author ?: string | null|undefined ,  
                private _creationYear  ?: Date | null|undefined ,
                private _firstCommercializationYear ?: Date | null|undefined ,  
                private _photos ?: Photo[] | null ,  //6 photos
                private _estimatedPrice ?: string | null |undefined,
                private _assessment ?: string | null |undefined         //appréciation laissée par l'expert 
 
        ) { 
        this._id=_id;
        this._email=_email;
        this._articleName=_articleName;
        this._features=_features;
        this._defaults=_defaults;
        this._signature=_signature;
        this._author=_author;
        this._creationYear=_creationYear;
        this._firstCommercializationYear=_firstCommercializationYear;
        this._photos=_photos;
        this._estimatedPrice=_estimatedPrice;
        this._assessment=_assessment;       
     
}


public toJsonString(){    

   let res="{ \"id\":\""+ this._id+"\","+
     "\"email\":\""+ this.email+"\","+
     "\"articleName\":\""+ this._articleName+"\","+
     "\"features\":\""+ this._features+"\","+
     "\"defaults\":\""+ this._defaults+"\","+
     "\"signature\":\""+ this._signature+"\","+
     "\"author\":\""+ this._author+"\","+
     "\"creationYear\":\""+ this._creationYear+"\","+
     "\"firstCommercializationYear\":\""+ this._firstCommercializationYear+"\","+
     "\"photos\":\""+ this._photos+"\","+
     "\"estimatedPrice\":\""+ this._estimatedPrice+"\","+
     "\"assessment\":\""+ this._assessment+       
    "\"}";


    return res;
}

public get id(): number | null|undefined |undefined{
    return this._id;
}
public set id(value: number | null) {
    this._id = value;
}


public get email(): string | null|undefined {
    return this._email;
}
public set email(value: string | null) {
    this._email = value;  
}

public get articleName(): string | null|undefined {
    return this._articleName;
}
public set articleName(value: string | null) {
    this._articleName = value;
}
public get assessment(): string | null|undefined {
    return this._assessment;
}
public set assessment(value: string | null) {
    this._assessment = value;
}

public get author(): string | null|undefined {
    return this._author;
}
public set author(value: string | null) {
    this._author = value;
}


public get estimatedPrice(): string | null |undefined{
    return this._estimatedPrice;
}
public set estimatedPrice(value: string | null) {
    this._estimatedPrice = value;
}
public get photos(): Photo[] | null|undefined {
    return this._photos;
}
public set photos(value: Photo[] | null) {
    this._photos = value;
}
public get firstCommercializationYear(): Date | null |undefined{
    return this._firstCommercializationYear;
}
public set firstCommercializationYear(value: Date | null) {
    this._firstCommercializationYear = value;
}
public get creationYear(): Date | null|undefined {
    return this._creationYear;
}
public set creationYear(value: Date | null) {
    this._creationYear = value;
}
public get signature(): string | null |undefined{
    return this._signature;
}
public set signature(value: string | null) {
    this._signature = value;
}
public get defaults(): string | null |undefined{
    return this._defaults;
}
public set defaults(value: string | null) {
    this._defaults = value;
}
public get features(): string | null|undefined {
    return this._features;  
}
public set features(value: string | null) {
    this._features = value;
}

public set expertise(value:Expertise){  //attribution d'id à partir d'object Expertise
    this.id=value.id;  //Le code compile avec l'erreur


}  
}