import { AddressType }from "../Types/AddressType"
export type ClientType={

     id: number;
     lastname: string;
     firstname: string;  
     password: string;
     genre: string;
     address: AddressType;
     deliveryAddress:AddressType;
     billingAddress:AddressType;
     emailAddress: string;
     
}