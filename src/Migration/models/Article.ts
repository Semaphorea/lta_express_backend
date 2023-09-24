
import { Table,Column,Model,DataType } from 'sequelize-typescript';
import { Photo } from './Photo';

@Table ({
    tableName: 'article'
})
export class Article extends Model{
    
   @Column({
    type:DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false})
    public id!: number ;

    @Column({
        type:DataType.STRING(128),
        allowNull:false})
    public title!: string;

      
     @Column({
        type:DataType.STRING(256),
        allowNull:false})
    public description!: string ;
     @Column({
        type:DataType.INTEGER,
        allowNull:false})
    public photo_id!: number  ;  
     @Column({
        type:DataType.INTEGER,
        allowNull:false})
    public availableUnits!: number ;
     @Column({
        type:DataType.DATE,
        allowNull:false})
    public year!: Date ;
     @Column({
        type:DataType.FLOAT,
        allowNull:false}) 
    public price!: number ;   
   
        //Relation One to One 
   static associate(){
    Photo.belongsTo(this, { foreignKey: 'photo_id' });
    this.hasOne(Photo, { foreignKey: 'id' }); 
}

}
Article.sync({force:true});