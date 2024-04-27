import { CommandeType } from '../Types/CommandeType.ts';
import { Article } from './Article.ts';




export class Commande implements CommandeType {

  private _id?: number | undefined;
  private _idClient: number | undefined;
  private _reference: string = '';
  private _articles: Article[] = [];
  private _insurance?: number | undefined;
  private _totalHT: number = 0;
  private _totalTTC: number = 0;
  private _TVA: number | undefined = 0.20;
  private _currency?: string = 'EURO';
  private _shipping_tax?: number | undefined;

  

  

  public constructor(idClient: number, reference: string, articles: Article[], totalHT: number, id?: number, currency?: string, shipping_tax?: number, TVA?: number,insurance?:number) {

    this.id = id;
    this.idClient = idClient;
    this.reference = reference;
    this.articles = articles;
    this.insurance=insurance;
    this.totalHT = totalHT;
    if (this._TVA != undefined) {
      this.totalTTC = totalHT * (1 + this._TVA);
    }
    this._TVA = TVA;
    if (currency != undefined) {
      this._currency = currency;
    }
    if (this._shipping_tax != undefined) {
      this._shipping_tax = shipping_tax;
    }

  }

  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }
  public get idClient(): number | undefined {
    return this._idClient;
  }
  public set idClient(value: number | undefined) {
    this._idClient = value;
  }

  public get articles(): Article[] {
    return this._articles;
  }
  public set articles(value: Article[]) {
    this._articles = value;
  }
  public get insurance(): number | undefined {
    return this._insurance;
  }
  public set insurance(value: number | undefined) {
    this._insurance = value;
  }
  public get currency(): string | undefined {
    return this._currency;
  }
  public set currency(value: string) {
    this._currency = value;
  }
  public get shipping_tax(): number | undefined {
    return this._shipping_tax;
  }
  public set shipping_tax(value: number | undefined) {
    this._shipping_tax = value;
  }

  public get totalHT(): number {
    return this._totalHT;
  }
  public set totalHT(value: number) {
    this._totalHT = value;
  }
  public get totalTTC(): number {
    return this._totalTTC;
  }
  public set totalTTC(value: number) {
    this._totalTTC = value;
  }
  public get TVA(): number | undefined {
    return this._TVA;
  }
  public set TVA(value: number) {
    this._TVA = value;
  }

  public get reference(): string {
    return this._reference;
  }
  public set reference(value: string) {
    this._reference = value;
  }

}