import { Address } from "./Address.ts";
import { ClientType } from "../Types/ClientType.ts";
import { Personne } from "../Types/Personne.ts";
export class Client implements ClientType, Personne {

 

    constructor(
        private _id: number,
        private _lastname: string,
        private _firstname: string,
        private _password: string,
        private _genre: string,
        private _address: Address,
        private _deliveryAddress: Address,
        private _billingAddress: Address,
        private _emailAddress: string,
        private _phoneNumber: string) {

        this._id = _id;
        this._lastname = _lastname;
        this._firstname = _firstname;
        this._password = _password;
        this._genre = _genre;
        this._address = _address;

        this._billingAddress = _billingAddress;
        this._emailAddress = _emailAddress;
        this._phoneNumber=_phoneNumber;
    }




    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get address(): Address {
        return this._address;
    }
    public set address(value: Address) {
        this._address = value;
    }

    public get emailAddress(): string {
        return this._emailAddress;
    }
    public set emailAddress(value: string) {
        this._emailAddress = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get billingAddress(): Address {
        return this._billingAddress;
    }
    public set billingAddress(value: Address) {
        this._billingAddress = value;
    }
    public get deliveryAddress(): Address {
        return this._deliveryAddress;
    }
    public set deliveryAddress(value: Address) {
        this._deliveryAddress = value;
    }
    public get genre(): string {
        return this._genre;
    }
    public set genre(value: string) {
        this._genre = value;
    }
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }
    public get lastname(): string {
        return this._lastname;
    }
    public set lastname(value: string) {
        this._lastname = value;
    }    
    public get phoneNumber(): string {
        return this._phoneNumber;
    }
    public set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    public static JsonToClient(object:JSON){ 
        let obj= JSON.parse(JSON.stringify(object));       
        if ("id" in obj && "lastname" in object && "firstname" in object && "password" in object
        && "genre" in object && "address" in object && "deliveryAddress" in object && "billingAddress" in object
        && "emailAdress" in object && "phoneNumber" in object ) {
            return new Client (obj.id,obj.lastname,obj.firstname,obj.password,obj.genre,obj.address,obj.deliveryAddress,obj.billingAddress,obj.emailAdress,obj.phoneNumber); 
            
            } 
  
        




    }
}