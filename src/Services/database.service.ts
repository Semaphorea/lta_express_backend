import { dataBaseConf } from '../../Configuration/Environnement/environnement.ts';
import mysql from 'mysql2';

  

class DataBaseService{
 private _connection:any =null;

constructor(){
        try{  
        this._connection=mysql.createConnection({
          host: dataBaseConf.host,
          user: dataBaseConf.identifiant,
          password: dataBaseConf.password,
          database: dataBaseConf.db
        });
      } catch (error) {
        console.error("Failed to connect to database:", error);
      }
}

public connectionMake():boolean{
        let res:boolean;
        let $connect=this.connection.connect();
        $connect!=null? res= true: res= false;
        return res;
  }

public static main(){ 
        let dbs:any=new DataBaseService();

        let $r=  dbs.connectionMake();
        $r=!null? console.log("Base de Donnees exist"):console.log("Base de Donnees n'existe pas");
                          let $res=dbs.query("Select * from mysql.user where id=1;");
                              dbs.traitementResults($res);
 }




public query(query:string):any{
        this.connection.query(query, (err:any, rows:any, fields:any) => {
          console.error('Votre base de donnee est vide' );
        if (err){ throw err;}
        else{
          console.log(rows);
          return rows;}
        })
}


public traitementResults($rows:any[]){
    try{
     for(let $element of $rows){
        console.log($element);
     }
    }catch(error:any){console.error("Error de traitement des résultats de la requête "+error);}

}



public get connection(){
  return this._connection;
}

public get endConnection(){
  return this._connection.end();}

}

DataBaseService.main();