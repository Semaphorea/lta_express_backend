import { Blob } from "buffer";


const fs= require('fs');


export class JsonFileController{

    private _file!: File; 
    private _fileName!:string;
    private _typeElementJson!: string;
    
    private _jsonObject!: JSON;  
   
   


public constructor(file:File,jsonElement:string){
    this._file=file;  //la configuration de file.name semble ne pas fonctionner
    
    
    this.fileName="./src/mock/expertises.json";
    this._typeElementJson="expertises";
    console.log("jsonFileController"+this.fileName);  
     
    this._jsonObject= JSON.parse('\"'+jsonElement+'\"'); 
}


createItem(data:string){  this.getLastId();
          



}


readItem(id:number){  const f=this.readFile(this.file);                      
                      const elementsArray = Object.values(this._jsonObject);
                      const el = elementsArray.find((element:any) => {if(element.id === id) return element ; });
                      return el;
                    }


deleteItem(id:number){const element=this.readItem(id);
                    //   delete element(si référence json);
                    }
updateItem(id:any,parametre:string,value:string){
       try{
        if (this.jsonObject) {
           let obj:any=this.jsonObject;
              
            obj[id][parametre] = value;
            this._jsonObject =<JSON> obj;
            console.log("jsonFileController L44 : le parametre "+parametre+" a bien été modifier et doit être persisté.");
          }
          
       }catch(error){console.error('Impossiblilité de modifier  :'+parametre+' dans le fichier json.');}
}

 async getLastId(){

    let fileblob=await this.readFileBlob(this.fileName);  
    let jsonObject= JSON.parse( fileblob.toString());   
    let searchElement=this.typeElementJson;
    console.log(jsonObject[searchElement]);  
    const nbElement= jsonObject[searchElement].length; 
    const lastElement=jsonObject[searchElement][nbElement-1]; 
    console.log("jsonFileController L81 : "); 
    console.log(lastElement);
    const lastid=Number.parseInt(lastElement.id);  
    console.log(lastid);
    return lastid ; 
  }





readFile(file:File):any{
       
    const fsPromises = fs.promises;
    fsPromises.readFile(file.name, 'utf8') 
        .then((data:any) => { 
                return JSON.parse(data);            
         })
        .catch((err:any) => { console.log("Read Error: " +err);});
}

async readFileBlob(fileName:string):Promise<File>{ 
   const fileP= fs.readFileSync(fileName);
//    .then((response:any )=> response.blob())
//    .then((blob:any) => {
//     let  filePart= new File([blob], fileName);  
    
//    return  this.readFile(filePart);
//    }).error((error:any)=> {return error;}    
   
//    );
 return fileP;

}  

writeEndFile(file:File,jsonData:JSON):Boolean|any{
    console.log("jsonFileController L82 : "+jsonData);  

    let filename=this.fileName;
    console.log(filename);
        const fsPromises = fs.promises;
        fsPromises.readFile(filename, 'utf8') 
            .then((data:any) => { 

                let json = JSON.parse(data);
                // console.log('jsonFileControler L114 : '+JSON.stringify(json)); 
                // console.log(json.expertise);

                    json[this._typeElementJson].push(jsonData);    

               return fsPromises.writeFile(filename, JSON.stringify(json))
                        .then(  () => { console.log('Append Success'); return true;})
                        .catch((err:any) => { console.log("Append Failed: " + err);return false;});
            })  
        .catch((err:any) => { console.log("Read Error: " +err);return false;});

        return fsPromises;

}

writeFile(file:File,jsonData:JSON):Boolean|any{
    
    const fsPromises = fs.promises;  
    fsPromises.readFile(this.fileName, 'utf8') 
        .then((data:any) => { 
                let json = JSON.parse(data);
                  json.myArr.delete();
                  json.myArr.push(jsonData); 

               return fsPromises.writeFile(file.name, JSON.stringify(json))
                        .then(  () => { console.log('File Record Success');return true; })
                        .catch((err:any) => { console.log("File Record Failed: " + err);return false;});
            })
        .catch((err:any) => { console.log("Read Error or file don't existe: " +err);return false});

        return fsPromises;
}


public get file(): File {
    return this._file;
}
public set file(value: File) {
    this._file = value;
}


public get fileName(): string {
   // return this._file.name;   //si l'assignation de _file.name fonctionne
   return this._fileName;
}
public set fileName(fileName: string) {
 //   Object.defineProperty(this._file, name, { writable: true }); //si l'assignation de _file.name fonctionne
    this._fileName=fileName;
}


public get jsonObject(): JSON {
    return this._jsonObject;
}
public set jsonObject(value: JSON) {
    this._jsonObject = value;
}

public get typeElementJson(): string {
    return this._typeElementJson;
}
public set typeElementJson(value: string) {
    this._typeElementJson = value;  
}

}