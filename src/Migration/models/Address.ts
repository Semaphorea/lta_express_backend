import { Table,Column,Model,DataType,Sequelize} from 'sequelize-typescript';
import {development}from '../config/config.json';


 
module.exports= (Sequelize:any,DataType:any)=>{


@Table ({
       tableName: 'Address'
 })
class Address extends Model{


    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false})
    id!:number;
  
    @Column({
        type:DataType.INTEGER,
        allowNull:true
        })
    numeroDeVoie! : number;

    
      @Column({
        type:DataType.STRING(32),
        allowNull:false})
        typeDeVoie! : string; 
      
        @Column({
        type:DataType.STRING(256),
        allowNull:false})
        address! : string;   
      
        @Column({
        type:DataType.STRING(256),
        allowNull:false})
        complementAddress! : string ;
      
        @Column({
        type:DataType.TINYINT,
        allowNull:false,
    
        })
        postCode!:number; 
      
        @Column({
        type:DataType.STRING(64),
        allowNull:false})
        city! : string ; 
      
        @Column({
        type:DataType.STRING(64),
        allowNull:false})
        country! : string ;    




}

let sequelize:Sequelize= new Sequelize({
    database: development.database,
    dialect: 'mysql',
    username: development.username,
    password: development.password });

  sequelize.addModels([Address]);

}
