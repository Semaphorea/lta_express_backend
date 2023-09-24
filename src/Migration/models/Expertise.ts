
import { Table,Column,Model,DataType } from 'sequelize-typescript';

import { Photo } from "./Photo";
import { Sequelize } from 'sequelize';


@Table ({
    tableName: 'Expertise'
})
export class Expertise extends Model{
   
  
            constructor(){
                super();
            }

                @Column({
                    type:DataType.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull:false})
                    id !:number ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                 email !: string  ; 
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                 articleName !: string ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                 features !: string   ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                 defaults !: string   ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                 signature !: string   ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                 author !: string  ;  

                @Column({
                type:DataType.DATE,
                allowNull:false})
                 creationYear  !: Date   ;
                
                @Column({
                type:DataType.DATE,
                allowNull:false})
                 firstCommercializationYear !: Date   ;  
                
                @Column({
                type:DataType.ARRAY(),  
                 allowNull:false,
                 
                 get() {
 			       return this.getDataValue('photos').split(';')  //Fortes chances pour que ce soit plus complexe que cela
 			   },
 			   set(val:number[]) { 
			       this.setDataValue('photos',val.join(';'));  
			    }    
                })
                 photos !: Photo[]  ;  //6 photos
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                 estimatedPrice !: string  ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                 assessment !: string         
 

        static associate(){
                 this.hasMany(Photo, { foreignKey: 'id' });
                 Photo.belongsTo(Expertise, { foreignKey: 'id' });
        }
}  

Expertise.sync();