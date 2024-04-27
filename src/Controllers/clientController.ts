
import { ManageDonnees } from '../Services/manageDonnees.service.ts'
import { Client } from "../Entitees/Entites/Client.ts";
export class ClientController {

  public _client?: Client;

  constructor(...args: any) {
    let nbargs: Number = args.lenght; 
    switch (nbargs) {
      case 0: () => { }; break;
      case 1: (client: Client) => { this._client = client; }
    }

  }


  /**
   * Function deleteClient
   * @param typePersistance :string
   * @param id :Number
   * @returns 
   */
  public deleteClient(typePersistance: string, id: Number): Boolean {
    let manageDonnees = new ManageDonnees();
    manageDonnees.instantiateProperties('clients');
    return manageDonnees.delete(id);
  }


  public processClient() { }

  /**
   * Function persist
   * @param typePersistance :string
   * @returns Promise: any 
   */
  public async persist(typePersistance: string) {

    let manageDonnees = new ManageDonnees('clients');
    // console.log("clientController L32", this.client);
    let ret = await manageDonnees.persist(this.client, typePersistance)
      .then(() => { return true; })
      .catch((err: any) => { console.error("Route : /clients/create - Request failed to post requestValue !"); return false; })
    return ret;
  }

  /**
   * Function update
   * @param typePersistance : string
   * @returns Promise<boolean>
   */
  public async update(typePersistance: string) {
    return this.persist(typePersistance);

  }


  public fetchClientDB() { }

  /**
   * Function fetchLastId
   * @param typePersistance : string
   * @returns ret : Number
   */


  public fetchLastId(typePersistance: string): Number {
    let manageDonnees = new ManageDonnees('clients');
    let ret = manageDonnees.getLastId(typePersistance);
    return ret;
  }

  /**
   * Function fetchLastReference
   * @param typePersistance :string 
   * @returns ret:string
   */
  public fetchLastReference(typePersistance: string): string {
    let manageDonnees = new ManageDonnees('clients');
    let ret = manageDonnees.getLastReference(typePersistance);
    return ret;
  }






  /**
   * Function setRequestClient
   * @param requestValue :any
   * @returns client:Client
   * @todo Gestion de l'id  
   */
  public setRequestClient(requestValue: any) {
    console.log('clientController 60 : ', requestValue);
    let client = new Client(requestValue.id, requestValue.lastname, requestValue.firsname, requestValue.password, requestValue.genre, requestValue.address, requestValue.deliveryAddress, requestValue.billingAddress, requestValue.emailAddress, requestValue.phoneNumber);

    this._client = client;

    console.log('clientController 64 : ', this._client);
    return client;
  }
 


  public get client(): Client | null | undefined { return this._client; }
  public set client(client: Client) {
    this._client = client;

  }







}