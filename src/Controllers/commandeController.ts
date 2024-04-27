
import { ManageDonnees } from '../Services/manageDonnees.service.ts'
import { Commande } from "../Entitees/Entites/Commande.ts";
 

export class CommandeController {

  public _commande?: Commande;

  constructor(...args: any) { 
    let nbargs: Number = args.lenght;
    switch (nbargs) {
      case 0: () => { }; break;
      case 1: (commande: Commande) => { this._commande = commande; }
    }

  }
  /**
   * Function deleteCommande
   * @param typePersistance :string
   * @param id :Number
   * @returns Boolean
   */
  public deleteCommande(typePersistance: string, id: Number): Boolean {
    let manageDonnees = new ManageDonnees();
    manageDonnees.instantiateProperties('commandes');
    return manageDonnees.delete(id);
  }

  public processCommande() { }

  /**
   * Function persist
   * @param typePersistance :string
   * @returns ret: Promise<any>
   */
  public async persist(typePersistance: string) {

    let manageDonnees = new ManageDonnees('commandes');
    console.log("commandeController L32", this.commande);
    let ret = await manageDonnees.persist(this.commande, typePersistance)
      .then(() => { return true; })
      .catch((err: any) => { console.error("Route : /commandes/create - Request failed to post requestValue !"); return false; })
    return ret;
  }

  /**
   * Function update
   * @param typePersistance :string
   * @returns Promise<boolean>
   */
  public async update(typePersistance: string) {
    return this.persist(typePersistance);

  }

  /**
   * fetchCommandeDB
   */
  public fetchCommandeDB() { }


  /**
   * Function fetchLastId
   * @param typePersistance 
   * @returns  ret : Number
   */
  public fetchLastId(typePersistance: string): Number {
    let manageDonnees = new ManageDonnees('commandes');
    let ret = manageDonnees.getLastId(typePersistance);
    return ret;
  }

  /**
   * Function fetchLastReference
   * @param typePersistance :string
   * @returns ret:string
   */
  public fetchLastReference(typePersistance: string): string {
    let manageDonnees = new ManageDonnees('commandes');
    let ret = manageDonnees.getLastReference(typePersistance);
    return ret;
  }

  /**
   * Function setRequestCommande
   * @param requestValue :any
   * @returns commande:Commande
   */  
  public setRequestCommande(requestValue: any) {
    console.log('commandeController 91 : ', requestValue);

    // idClient: number,reference: string,  articles: Article[], totalHT: number,totalTTC:number, id?: number ,TVA?: number,  currency?: string, shipping_tax?: number 
    let commande = new Commande(requestValue.idClient,requestValue.reference,requestValue.articles, requestValue.totalHT,  requestValue.totalTTC, requestValue.id,requestValue.TVA,requestValue.currency, requestValue.shipping_tax);
    this._commande = commande;

    console.log('commandeController 97 : ', this._commande);
    return commande;
  }



  public get commande(): Commande | null | undefined { return this._commande; }
  public set commande(commande: Commande) {
    this._commande = commande; 

  }







}