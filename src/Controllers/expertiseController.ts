
import { ManageDonnees } from '../Services/manageDonnees.service.ts'
import { Expertise } from "../Entitees/Entites/Expertise.ts";
import QueryString from 'qs';
import querystring from "querystring";
import ParsedUrlQuery from "querystring";
import { ParsedQs } from 'qs';
export class ExpertiseController {

  public _expertise?: Expertise; 

  constructor(...args: any) {
    let nbargs: Number = args.lenght;
    switch (nbargs) {
      case 0: () => { }; break;
      case 1: (expertise: Expertise) => { this._expertise = expertise; }
    }

  }
  /**
   * Function deletExpertise
   * @param typePersistance :string
   * @param id : Number
   * @returns Boolean
   */
  public deleteExpertise(typePersistance: string, id: Number): Boolean {
    let manageDonnees = new ManageDonnees();
    manageDonnees.instantiateProperties('expertises');
    return manageDonnees.delete(id);
  }



  public processExpertise() { }

  /**
   * Function persist
   * @param typePersistance :string
   * @returns Boolean
   */
  public async persist(typePersistance: string) {

    let manageDonnees = new ManageDonnees('expertises');
    console.log("expertiseController L35", this.expertise);
    let ret = await manageDonnees.persist(this.expertise, typePersistance)
      .then(() => { return true; })
      .catch((err: any) => { console.error("Route : /expertise/submit-form - Request failed to post requestValue !"); return false; })
    return ret;
  }

  public async update(typePersistance: string) {
    return this.persist(typePersistance);

  }


  public fetchExpertiseDB() { }

  /**
   * Function fetchLastId
   * @param typePersistance :string
   * @returns Number
   */
  public fetchLastId(typePersistance: string): Number {
    let manageDonnees = new ManageDonnees('expertises');
    let ret = manageDonnees.getLastId(typePersistance);
    return ret;
  }

  /**
   * Function setRequestExpertise
   * @param requestValue :any
   * @returns expertise:Expertise
   */
  public setRequestExpertise(requestValue: any) {
    console.log('expertiseController 76 : ', requestValue);
    let expertise = new Expertise(requestValue._id, requestValue._email, requestValue._articleName, requestValue._features, requestValue._defaults, requestValue._signature,
      requestValue._author, requestValue._creationYear, requestValue._firstCommercializationYear, requestValue._photos, requestValue._estimatedPrice, requestValue._assessment);
    this._expertise = expertise;

    console.log('expertiseController 61 : ', this._expertise);
    return expertise;
  }



  public get expertise(): Expertise | null | undefined { return this._expertise; }
  public set expertise(expertise: Expertise) {
    this._expertise = expertise;
 
  }







}