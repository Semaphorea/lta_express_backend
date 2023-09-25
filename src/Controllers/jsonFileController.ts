import { Blob } from "buffer";
import { Expertise } from "../Entitees/Entites/Expertise";


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


public readItem(id:number){  const f=this.readFile(this.file);                      
                      const elementsArray = Object.values(this._jsonObject);
                      const el = elementsArray.find((element:any) => {if(element.id === id) return element ; });
                      return el;
                    }


public deleteItem(id:number){const element=this.readItem(id);
                    //   delete element(si référence json);
                    }
public updateItem(id:any,parametre:string,value:string){
       try{
        if (this.jsonObject) {
           let obj:any=this.jsonObject;
              
            obj[id][parametre] = value;
            this._jsonObject =<JSON> obj;
            console.log("jsonFileController L44 : le parametre "+parametre+" a bien été modifié et doit être persisté.");
          }
          
       }catch(error){console.error('Impossiblilité de modifier  :'+parametre+' dans le fichier json.');}
}

 public async getLastId(){

    let file=fs.readFileSync(this.fileName);  
    let jsonObject= JSON.parse( file.toString());   
    let searchElement=this.typeElementJson;

    const nbElement= jsonObject[searchElement].length; 
    const lastElement=jsonObject[searchElement][nbElement-1]; 
    console.log('jsonFileController'); 
    console.log(jsonObject[searchElement]);
    const lastid=Number.parseInt(lastElement.id);  
    
    return lastid ; 
  }





public readFile(file:File):any{
       
    const fsPromises = fs.promises;
    fsPromises.readFile(file.name, 'utf8') 
        .then((data:any) => { 
                return JSON.parse(data);            
         })
        .catch((err:any) => { console.log("Read Error: " +err);});
}

/**
 * WriteFile
 * @param : jsonData : Json
 * Ajout en fin de fichier
 **/
public writeEndFile(jsonData:JSON):Boolean|any{
    //console.log("jsonFileController L93 : "+JSON.stringify(jsonData));  
 console.log("jsonFileController L97");
 console.log(jsonData);
    let filename=this.fileName;
    console.log(filename);
        const fsPromises = fs.promises;
        fsPromises.readFile(filename, 'utf8') 
            .then((data:any) => { 
                let json = JSON.parse(data);
                json[this._typeElementJson].push(jsonData);                    
                console.log(this.fileName,JSON.stringify(jsonData));  
             
                return fsPromises.writeFile(this.fileName,JSON.stringify(jsonData))
                        .then(  (value:any) => { console.log('Append Success'); return true;})
                        .catch((err:any) => { console.log("jsonFileController.ts L109 , writeEndFile() : Append Failed: " + err);return false;});
            })  
        .catch((err:any) => { console.log("Read Error: " +err);return false;});

        return fsPromises;

}

public writeFileId(id:number,jsonData:JSON):Boolean|any{
    let filename=this.fileName;
  
    console.log('jsonFileController writeFileId L121 : ',jsonData);
    console.log(filename);
    console.log(this.file);
    const fsPromises = fs.promises;

                //Lecture récupération des données du fichier
                fsPromises.readFile(filename, 'utf8')
                    .then((data: any) => {
                        let json = JSON.parse(data);  
                        let typeElement = json[this._typeElementJson];           
                        // console.log("jsonFileController.ts L131",typeElement);

                        if (typeElement) {  

                //Evaluation de tous les elements du fichier et modification des elemenents existant.
              
                let updatedTypeElement = typeElement.map((element: any) => {
                    
                            let currentId = Number.parseInt(element.id);
                            console.log("jsonFileController L141 : ");
                            console.log(currentId);
                            console.log(id);
                            if (currentId === id) {
                            return jsonData; // Update the element
                            } else {
                            return element; // Keep the element unchanged
                            }
                }).sort((a: any, b: any) => {
                    return Number.parseInt(a.id) - Number.parseInt(b.id);
                });


                //Ajout d'un element avec id supérieur
                //check existence de l'id dans le fichier.
                console.log('L154');
                
                console.log(updatedTypeElement);
                let a=this.checkIdExistence(updatedTypeElement,id); 
                console.log(a);
                if(!this.checkIdExistence(updatedTypeElement,id)){
                    updatedTypeElement[id]=jsonData;
                  // console.log(updatedTypeElement[id]);
                  

                };

                console.log("jsonFileController L166",this._typeElementJson);
               
                let res:any = { [this._typeElementJson]: updatedTypeElement };
                console.log("jsonFileController L169",res);
                
                // Write the updated JSON data back to the file
                return this.writeFile(res);
                } else {
                console.error('jsonFileController L174: ' + json[this._typeElementJson] + ' is not initialized!');
                return false;
                }
                        

             
            })
           .catch((err:any) => { console.log("jsonFileController.ts L181, writeFiledId() : Read Error: " +err);return false;});
}





/**
 * checkIdExistence
 * @param tabElement 
 * @param id 
 * @returns boolean
 */
public checkIdExistence(tabElement:any, id:Number):boolean{
    let res:boolean=false;
      


     for (const element of tabElement) {
        
         if( element!=null){
            if(element.id === id ){ res=true ;}}
     }

   

  
   return res;
}

/**
 * WriteFile
 * @param : jsonData : Json
 * Suppression integrale du fichier avant écriture
 **/
public writeFile(jsonData:JSON):Boolean|any{ 
    console.log("jsonFileController L219",jsonData);
    const fsPromises = fs.promises; 
    console.log("jsonFileController L221 writeFile : Données écrites : ",jsonData); 

    const jsonString = JSON.stringify(jsonData, (key, value) => {
        if (value === undefined) {
          return 'undefined';
        }
        return value;
      });


      return fsPromises.writeFile(this.fileName, jsonString)
                        .then(  () => { console.log('File Record Success');return true; })
                        .catch((err:any) => { console.log("File Record Failed: " + err);return false;});
                 
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