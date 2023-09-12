import { Table,Column,Model,DataType } from 'sequelize-typescript';



import { Address } from './Address' ;
import { Photo } from './Photo' ;

@Table ({
    tableName: 'Expert'
})  
export class Expert extends Model{

    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false})
    id!: number ; 

    
        @Column({
        type:DataType.STRING,
        allowNull:false})
        name!:string ;
    
        @Column({
        type:DataType.STRING,
        allowNull:false})
        firstname! : string ;
    
        @Column({
        type:Address,
        allowNull:false})
        address!:Address ;
    
        @Column({
        type:DataType.STRING,
        allowNull:false})
        diplomes!: string[];
    
        @Column({
        type:DataType.STRING,  
        allowNull:false})
        experiences! : string[] ; 
    
        @Column({
        type:DataType.STRING,
        allowNull:false})
        email! : string ;
    
        @Column({
        type:DataType.STRING,
        allowNull:false})
        phoneNumber!: string ;
    
        @Column({
        type:DataType.INTEGER,
        allowNull:false})
        photo_id!: number ;
    
   
}