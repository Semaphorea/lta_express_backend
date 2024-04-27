
import { ManageDonnees } from '../Services/manageDonnees.service.ts'
import { User } from "../Entitees/Entites/User.ts";

export class UserController {

  public _user?: User;

  constructor(...args: any) {
    let nbargs: Number = args.lenght;
    switch (nbargs) {
      case 0: () => { }; break;
      case 1: (user: User) => { this._user = user; }
    }

  }  


  /**
   * Function deleteUser
   * @param typePersistance :string
   * @param id :Number
   * @returns 
   */
  public deleteUser(typePersistance: string, id: Number): Boolean {
    let manageDonnees = new ManageDonnees();
    manageDonnees.instantiateProperties('users');
    return manageDonnees.delete(id);
  }


  public processUser() { }

  /**
   * Function persist
   * @param typePersistance :string
   * @returns Promise: any 
   */
  public async persist(typePersistance: string) {

    let manageDonnees = new ManageDonnees('users');
    console.log("userController L32", this.user);
    let ret = await manageDonnees.persist(this.user, typePersistance)
      .then(() => { return true; })
      .catch((err: any) => { console.error("Route : /users/create - Request failed to post requestValue !"); return false; })
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


  public fetchUserDB() { }

  /**
   * Function fetchLastId
   * @param typePersistance : string
   * @returns ret : Number
   */
  public fetchLastId(typePersistance: string): Number {
    let manageDonnees = new ManageDonnees('users');
    //console.log("userController 69 ElementJSON : ",manageDonnees.typeElementJson);
    let ret = manageDonnees.getLastId(typePersistance);
    return ret;
  }

  /**
   * Function fetchLastReference
   * @param typePersistance :string 
   * @returns ret:string
   */
  public fetchLastReference(typePersistance: string): string {
    let manageDonnees = new ManageDonnees('users');
    let ret = manageDonnees.getLastReference(typePersistance);
    return ret;
  }






  /**
   * Function setRequestUser
   * @param requestValue :any
   * @returns user:User
   * @todo Gestion de l'id  
   */
  public setRequestUser(requestValue: any) {
    console.log('userController 60 : ', requestValue);
    let user = new User(requestValue.id, requestValue.id_personne, requestValue.identifiant, requestValue.password);

    this._user = user;

    console.log('userController 64 : ', this._user);
    return user;
  }



  public get user(): User | null | undefined { return this._user; }
  public set user(user: User) {
    this._user = user;
  }







}