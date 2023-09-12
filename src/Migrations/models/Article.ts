
import { Table,Column,Model,DataType } from 'sequelize-typescript';


@Table ({
    tableName: 'articles'
})
export class Article extends Model{
    
   @Column({
    type:DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false})
    public id!: number ;

    @Column({
        type:DataType.STRING,
        allowNull:false})
    public title!: string;

      
     @Column({
        type:DataType.STRING,
        allowNull:false})
    public description!: string ;
     @Column({
        type:DataType.STRING,
        allowNull:false})
    public url!: string ;
     @Column({
        type:DataType.STRING,
        allowNull:false})
    public availableUnits!: number ;
     @Column({
        type:DataType.STRING,
        allowNull:false})
    public year!: number ;
     @Column({
        type:DataType.STRING,
        allowNull:false})
    public price!: number ;
 





  

}