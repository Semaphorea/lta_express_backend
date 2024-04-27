
import { ManageDonnees } from '../Services/manageDonnees.service.ts' 
import { Address } from "../Entitees/Entites/Address.ts";

export class AddressController {

  public _address?: Address;

  constructor(...args: any) {
    let nbargs: Number = args.lenght;
    switch (nbargs) {  
      case 0: () => { }; break;
      case 1: (address: Address) => { this._address = address; }
    }

  }
 

  /**
   * Function deleteAddress
   * @param typePersistance :string
   * @param id :Number
   * @returns 
   */
  public deleteAddress(typePersistance: string, id: Number): Boolean {
    let manageDonnees = new ManageDonnees();
    manageDonnees.instantiateProperties('address');
    return manageDonnees.delete(id);
  }


  public processAddress() { }

  /**
   * Function persist
   * @param typePersistance :string
   * @returns Promise: any 
   */
  public async persist(typePersistance: string) {

    let manageDonnees = new ManageDonnees('address');
    console.log("addressController L42", this.address);
    let ret = await manageDonnees.persist(this.address, typePersistance)
      .then(() => { return true; })
      .catch((err: any) => { console.error("Route : /address/create - Request failed to post requestValue !"); return false; })
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


  public fetchAddressDB() { }

  /**
   * Function fetchLastId
   * @param typePersistance : string
   * @returns ret : Number
   */


  public fetchLastId(typePersistance: string): Number {
    let manageDonnees = new ManageDonnees('address');
    let ret = manageDonnees.getLastId(typePersistance);
    return ret;
  }

  /**
   * Function fetchLastReference
   * @param typePersistance :string 
   * @returns ret:string
   */
  public fetchLastReference(typePersistance: string): string {
    let manageDonnees = new ManageDonnees('address');
    let ret = manageDonnees.getLastReference(typePersistance);
    return ret;
  }






  /**
   * Function setRequestAddress  
   * @param requestValue :any
   * @returns address:Address
   * @todo Gestion de l'id  
   */
  public setRequestAddress(requestValue: any) {
    console.log('addressController 60 : ', requestValue);
    let address = new Address(requestValue.id,requestValue.id_personne, requestValue.streetNumber, requestValue.typeOfRoad, requestValue.address, requestValue.complementAddress, requestValue.postCode, requestValue.city, requestValue.country);

    this._address = address;

    console.log('addressController 64 : ', this._address);
    return address;
  }  
 


  public get address(): Address | null | undefined { return this._address; }
  public set address(address: Address) {
    this._address = address;

  }







}