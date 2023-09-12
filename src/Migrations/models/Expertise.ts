
import { Table,Column,Model,DataType } from 'sequelize-typescript';

import { Photo } from "./Photo";


@Table ({
    tableName: 'Expertise'
})
export class Expertise {
   
  


                @Column({
                    type:DataType.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull:false})
                private id !:number ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                private email !: string  ; 
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                private articleName !: string ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                private features !: string   ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                private defaults !: string   ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                private signature !: string   ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                private author !: string  ;  

                @Column({
                type:DataType.DATE,
                allowNull:false})
                private creationYear  !: Date   ;
                
                @Column({
                type:DataType.DATE,
                allowNull:false})
                private firstCommercializationYear !: Date   ;  
                
                @Column({
                type:DataType.INTEGER,  
                 allowNull:false    
                })
                private photos !: Photo[]  ;  //6 photos
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                private estimatedPrice !: string  ;
                
                @Column({
                 type:DataType.STRING,
                 allowNull:false})
                private assessment !: string         
 
}  