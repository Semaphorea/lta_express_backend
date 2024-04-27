
import { Request, Response } from 'express';
import fs from 'fs';

import { JsonFileController } from '../Controllers/jsonFileController.ts';
import { Client } from '../Entitees/Entites/Client.ts';
import { User } from '../Entitees/Entites/User.ts'; 

import path from 'path';  
import { fileURLToPath } from 'url';

import articles from '../mock/articles.json';
import address from '../mock/address.json';
import evenements from '../mock/evenements.json';
import expertises from '../mock/expertises.json';
import experts from '../mock/experts.json'; 
import commandes from '../mock/commandes.json';  
import clients from '../mock/clients.json';
import users from '../mock/users.json';  
export  class ManageDonnees {

  private _typeElementJson?: string;
  private _file: any;
  private jsonFileController?: JsonFileController;

  constructor(...args: any) {
    let nbargs: Number = args.length; 

    switch (nbargs) {
      case 0: () => { }; break;
      case 1: (() => { this.instantiateProperties(args[0]); })(); break;
    }
  }


  /**Fonctions de Récupération  */


  /**
   * findAllFromMock
   * @param res 
   * @returns donnees:JSON
   */
  findAllFromMock(res: Response) {

    return res.status(200).json(this.file);

  }



    /**
   * findFromMockById
   * @param req   
   * @param res 
   * @param donnees 
   * @param SearchParameter 
   * @return donnee:JSON
   */
    findFromMockBy(req: Request, res: Response,parameter:any):JSON|undefined {
  
  
      try {
        //Récupération du type d'element à chercher ex: article
        const jsonObject = JSON.parse('\"' + this.typeElementJson + '\"');
        //console.log(this.typeElementJson);
        // console.log(this.file);  
        let elements: any;
        elements = JSON.parse(JSON.stringify(this.file));
  
        const elementsArray = Object.values(elements[jsonObject]);
  
        const  el= elementsArray.find((element: any) => {
          return   element[parameter] === req.params[parameter];
        });

        if(el!=undefined){
               return JSON.parse(JSON.stringify(el));
        }
       
  
      } catch (error: any) {
        console.error('Error parsing JSON:', error);
      }
  
  
    }
  
   /**
    * findFromMockByEmail
    * @param req 
    * @param res 
    * @param email 
    * @returns Client
    */
   findFromMockByEmail(req: Request, res: Response,email:string):JSON|undefined{

   return this.findFromMockBy(req, res,email);

   }

   /**
    * findIdFromMockByEmail
    * @param req 
    * @param res 
    * @param email 
    * @returns 
    */
   findIdFromMockByEmail(req: Request, res: Response,email:string){

    let user=this.findFromMockByEmail(req, res,email);
    if(user!=undefined ){
      let client=Client.JsonToClient(user);

      if(client!=undefined){
      return client.id;
          
     }
   } 

  }
  
   /**
    * findFromMockByEmail
    * @param req 
    * @param res 
    * @param email 
    * @returns Client
    */
   findFromMockByIdentifiant(req: Request, res: Response,identifiant:string):JSON|undefined{
 
    return this.findFromMockBy(req, res,identifiant);
 
    }
  /**
    * findIdFromMockByidentifiant
    * @param req 
    * @param res 
    * @param identifiant 
    * @returns 
    */
  findIdFromMockByIdentifiant(req: Request, res: Response,identifiant:string){

    let user=this.findFromMockByIdentifiant(req, res,identifiant);
    if(user!=undefined ){
      let localuser=User.JsonToUser(user);

      if(localuser!=undefined){
      return localuser.id;
          
     }
   } 

  }

  /**
   * findFromMockById
   * @param req 
   * @param res 
   * @param donnees 
   * @param SearchParameter 
   * @return donnee:JSON
   */
  findFromMockById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      //Récupération du type d'element à chercher ex: article
      const jsonObject = JSON.parse('\"' + this.typeElementJson + '\"');

      let elements: any;
      elements = JSON.parse(JSON.stringify(this.file));

      const elementsArray = Object.values(elements[jsonObject]);

      const el = elementsArray.find((element: any) => {
        return Number(element.id) === Number(id);
      });


      res.status(200).json(el);

    } catch (error: any) {
      console.error('Error parsing JSON:', error);
    }


  }



  findFromMockByIdandClient(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const idClient = parseInt(req.params.idClient);


    try {
      //Récupération du type d'element à chercher ex: article
      const jsonObject = JSON.parse('\"' + this.typeElementJson + '\"');

      let elements: any;
      elements = JSON.parse(JSON.stringify(this.file));

      const elementsArray = Object.values(elements[jsonObject]);

      const el = elementsArray.find((element: any) => {
        return Number(element.id) === Number(id) && Number(element.idClient) === Number(idClient);  
      });  


      res.status(200).json(el);

    } catch (error: any) {
      console.error('Error parsing JSON:', error);
    }

  }



  getImage(res: Response, req: Request, apath: string): void { 
    const nameImage = req.params.name;  

    // __dirname is not fonctionnal in ES context that's why i must use the 2 following lines. E. Hamon 17/04/2024 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename); 

   
     
    //console.log(apath);
    //console.log(nameImage); 
    //console.log(__dirname);
    //console.log(imagePath);      
    const imagePath = path.join( __dirname,apath, nameImage);  
      

    // Use the 'fs' module to check if the donnees exists before sending it
    fs.access(imagePath, fs.constants.F_OK, (err: any) => {
      if (err) { 
        res.status(404).send('Image not found');
      } else {
        res.sendFile(imagePath);
      }
    });


  }


  /**Fonctions de Persistance */


  //Persistence en fin de fichier 
  async persist1(datas: any, mode: string): Promise<any> {

    console.log("manageDonnees.services L108", datas);

    let res: boolean = false;
    let typeElement = this.typeElementJson ? this.typeElementJson : '';
    let filecontroller = new JsonFileController(this.file, typeElement);


    let toRecord: string;
    //console.log("manageDonnees.service.ts L116, datas: ",datas);
    if (datas.photos = !undefined || datas.photos != null) {
      //console.log("manageDonnees.service.ts L117 : ",datas.photos);
      datas.photos = JSON.parse(JSON.stringify(datas.photos));
      //console.log("manageDonnees.service.ts L119 : ",datas.photos);
    }
    console.log('manageDonnees.service L122 : ', typeof datas);







    if (mode === 'mock') {

      console.log("manageDonnees.service L132 ", mode);
      console.log("manageDonnees.service L133", datas);

      //Remplacement des key de l'objet pour ne pas avoir '_' dans le fichier.

      const newDatas: any = {};
      for (let key in datas) {
        let newKey = key.startsWith('_') ? key.substring(1) : key;
        newDatas[newKey] = datas[key];
      }
      console.log('manageDonnees.service L131 ', newDatas);

      newDatas.id != null && datas.id != undefined && filecontroller.checkIdExistence(typeElement, newDatas.id) == false ?
        filecontroller.writeFileId(newDatas.id, newDatas) : filecontroller.writeEndFile(newDatas);
      res = true;
      //     console.error('manageDonnees.service.ts L136 : ', toRecord );
    }
    else if (mode === 'bdd') { console.log("manageDonnees.service L148: Persistance en BDD"); return true; }
    else { console.error("manageDonnees.service L149: Your Datas have not been saved !"); return false; }

    //console.log(file.getLastId());
    //déclenchement d'Event.
    //avec envoi des données par mail à l'expert et en cc au client.  

    return res;


  }











  //Persistence en fin de fichier 
  async persist(datas: any, mode: string): Promise<any> {

    console.log("manageDonnees.services L108", datas);

    let res: boolean = false;
    let typeElement = this.typeElementJson ? this.typeElementJson : '';
    let filecontroller = new JsonFileController(this.file, typeElement);


    let toRecord: string;

    if (datas.photos = !undefined || datas.photos != null) {
      datas.photos = JSON.parse(JSON.stringify(datas.photos));    
    }
    console.log('manageDonnees.service L122 : ', typeof datas);


    if (mode === 'mock') {    

      //Suppression des '_' présents  dans les key à cause des déclarations d'entité.
      const newDatas: any = {};
      for (let key in datas) {
        let newKey = key.startsWith('_') ? key.substring(1) : key;
        newDatas[newKey] = datas[key];
      }
     
      newDatas.id != null && datas.id != undefined && filecontroller.checkIdExistence(typeElement, newDatas.id) == false ?
        filecontroller.writeFileId(newDatas.id, newDatas) : filecontroller.writeEndFile(newDatas);
      res = true;
   
    }
    else if (mode === 'bdd') { console.log("manageDonnees.service L148: Persistance en BDD"); return true; }
    else { console.error("manageDonnees.service L149: Your Datas have not been saved !"); return false; }


    return res;


  }












  /**Fonctions de Suppression */
  public delete(id: Number): Boolean {
    this._file;

    try {

      //Récupération du type d'element à chercher ex: article
      const jsonObject = JSON.parse('\"' + this.typeElementJson + '\"');

      let elements: any;
      elements = JSON.parse(JSON.stringify(this.file));

      let elementsArray = Object.values(elements[jsonObject]);

      elementsArray = elementsArray.filter((values: any) => { if (values.id != id) { return values; } })

      //  let i:number = 0;                   
      // elementsArray= elementsArray.map((values:any)=>{values.id=i; i++;}); 

      let res: boolean = false;
      let filecontroller = new JsonFileController(this.file, this.typeElementJson ? this.typeElementJson : '');
      let fi = JSON.stringify(elementsArray);
      let out = "{\"expertises\":" + fi + "}";
      console.log(out);
      filecontroller.writeFile(JSON.parse(out));

      return true;

    } catch (error: any) {
      console.error('Error parsing JSON:', error);
      return false;
    }

  }

  public getLastId(typePersistance: string): Number {
    let res!: Number;
    console.log(this.getLastParameter('id', typePersistance));
    res = Number.parseInt(this.getLastParameter('id', typePersistance));

    return res;

  }

  public getLastReference(typePersistance: string): string {
    let res!: string;

    res = this.getLastParameter('reference', typePersistance);
    console.log("manageDonnees.service.ts getLastReference : ", res);
    return res;

  }

  public getLastParameter(parameter: any, typePersistance: string): any {

    let res!: any;

    try {
      if (typePersistance == 'mock') {
         const jsonObject = JSON.parse('\"' + this.typeElementJson + '\"');
         //  console.log("manageDonnees.service getLastParameter L361 elemenJson : ",this.typeElementJson ); 
         let elements: any;
         elements = JSON.parse(JSON.stringify(this.file));
         let elementsArray: any = Object.values(elements[jsonObject]);
         let nbElement = elementsArray.length;
        //  console.log("manageDonnees.service getLastParameter L367 elementArray : ",elementsArray ); 
        res = elementsArray[nbElement - 1][parameter];

      }
      else { console.log('manageDonnees.service.ts L200 : TODO : BDD management') };

    } catch (error: any) { console.error("manageDonnees.service L206 Erreur :" + error); }

    return res;

  }


  public instantiateProperties(typeElementJson: string) {
    this._typeElementJson = typeElementJson;
    switch (typeElementJson) {
      case 'articles': this.file = articles; break;
      case 'address': this.file = address; break;
      case 'evenements': this.file = evenements; break;
      case 'expertises': this.file = expertises; break;
      case 'experts': this.file = experts; break;
      case 'commandes': this.file = commandes; break;
      case 'users': this.file = users; break;
      case 'clients': this.file = clients; break;
    }
  }




  public get file(): any {
    return this._file;
  }
  public set file(value: any) {
    this._file = value;
  }
  public get typeElementJson(): string | undefined {
    return this._typeElementJson;
  }
  public set typeElementJson(value: string) {
    this._typeElementJson = value;
  }


}