import { Adresse } from './Interface/Adresse'
export class Address implements Adresse{
    id:number|null =null;
    numeroDeVoie : number|null = null;
    typeDeVoie : string|null = null; 
    address : string|null = null;   
    complementAddress : string|null = null ;
    postCode : string|null = null; 
    city : string|null = null ; 
    country : string|null = null ;     


    construct(
        id:number,
        numeroDeVoie : number,
        typeDeVoie : string, 
        address : string,  
        complementAddress : string ,
        postCode : string,
        city : string , 
        country : string , 
    ){
        this.id=id;
        this.numeroDeVoie=numeroDeVoie ;
        this.typeDeVoie=typeDeVoie ;
        this.address= address ;
        this.complementAddress = complementAddress ;
        this.postCode = postCode ;
        this.city = city ;
        this.country = country ;
    }

    public toString():string{  
         let res :string='';
        if (this.numeroDeVoie!=null ) { res =  this.numeroDeVoie.toString() ;} 
        if (this.typeDeVoie!=null ) { res =  this.typeDeVoie.toString() ;} 
        if (this.address!=null ) { res =  this.address;} 
        if (this.complementAddress!=null ) { res =  this.complementAddress;} 
        if (this.postCode!=null ) { res =  this.postCode;} 
        if (this.city!=null ) { res =  this.city ;} 
        if (this.country!=null ) { res =  this.country ;} 
        
        return  res ;}  
}