
import { Table,Column,Model,DataType } from 'sequelize-typescript';
import { PhotoType } from '../../Entitees/Types/PhotoType';


@Table ({
    tableName: 'Evenement'
})
export class Evenement extends Model { 

    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false})
    id!: number  ;  
    
    @Column({
        type:DataType.STRING,
        allowNull:false})
    title!: string;   

    @Column({
        type:DataType.DATE,
        allowNull:false})
    date! : Date [] ; 
    
    @Column({
        type:DataType.STRING,
        allowNull:false})
    description! : string ; 

    @Column({
        type:DataType.INTEGER,
        allowNull:false})
    photo_id!: number; 

   
}