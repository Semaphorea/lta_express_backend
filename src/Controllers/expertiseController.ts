
import {Expertise } from "../Entitees/Entites/Expertise";

export class ExpertiseController{

public expertise?:Expertise;
      

  constructor(expertise?:Expertise){
    this.expertise=expertise;
  }
    public main(){}

    public processExpertise(){}
    public persist(){}
    public fetchExpertiseDB(){}

    public getExpertise(){return this.expertise;}
    public setExpertise(expertise:Expertise){
          this.expertise=expertise;  

    }






}