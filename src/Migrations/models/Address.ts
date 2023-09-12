import { Table,Column,Model,DataType } from 'sequelize-typescript';


@Table ({
    tableName: 'Address'
})
export class Address extends Model{


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
        type:DataType.TINYINT(5),
        allowNull:false,
        })
        postCode! : string; 
      
        @Column({
        type:DataType.STRING(64),
        allowNull:false})
        city! : string ; 
      
        @Column({
        type:DataType.STRING(64),
        allowNull:false})
        country! : string ;    




}