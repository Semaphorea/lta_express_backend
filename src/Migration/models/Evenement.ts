
import { Table,Column,Model,DataType } from 'sequelize-typescript';
import { Photo } from './Photo';


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
        type:DataType.STRING(128),
        allowNull:false})
    title!: string;   

    @Column({
        type:DataType.DATE,
        allowNull:false})
    date! : Date [] ; 
    
    @Column({
        type:DataType.STRING(256),
        allowNull:false})
    description! : string ; 

    @Column({
        type:DataType.INTEGER,
        allowNull:false})
    photo_id!: number; 


   //Relation One to One 
   static associate(){
        Photo.belongsTo(this, { foreignKey: 'photo_id' });
        this.hasOne(Photo, { foreignKey: 'id' }); 
    }
 
}
Evenement.sync();