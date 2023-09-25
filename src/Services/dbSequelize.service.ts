import {Sequelize} from 'sequelize';
import { dataBaseConf } from '../../Configuration/Environnement/environnement';

export class dbSequelize{

    private _connexion: Sequelize;
  
     public constructor(){
               this._connexion=new Sequelize(dataBaseConf.db, dataBaseConf.identifiant,dataBaseConf.password,{dialect:"mysql", host:dataBaseConf.host});
     }


    
     public async connect(){
        try {
            await this.connexion.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
        
         
     }
 
     public unconnect(){
        this.connexion.close();
     }

     public get connexion(): Sequelize {
        return this._connexion;
    }
    public set connexion(value: Sequelize) {
        this._connexion = value;
    }





}