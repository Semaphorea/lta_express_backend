import { Table,Column,Model,DataType } from 'sequelize-typescript';


@Table ({
    tableName: 'Photo'
})
export  class Photo extends Model { 

  @Column({
    type:DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false})
    public id!: number ;

    
    
      @Column({
        type:DataType.STRING,
        allowNull:false})
      public title!: string ;
    
      @Column({
        type:DataType.DATE,
        allowNull:false})
      public date!: Date ;
    
      @Column({
        type:DataType.STRING,
        allowNull:false})
      public description!: string ;
    
      @Column({
        type:DataType.STRING,
        allowNull:false})
      public photo_url!: string ;
    
      @Column({
        type:DataType.STRING,
        allowNull:false})
      public photo_directory!: string ;
   


  
}

Photo.sync() ;