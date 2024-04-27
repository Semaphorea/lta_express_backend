import App from '../app.ts'


export class AppFactory {
    private appFactoryInstance:AppFactory|null= null;
    private appInstance: App | null = null;
  
    private constructor() {
  
    }
  

    public static  initiate(){
      let appfactory=new AppFactory()
            appfactory.setAppFactoryInstance( appfactory);
      return appfactory.getAppFactoryInstance();
    }

    public getAppInstance(): App {
      if (!this.appInstance) { 
        this.appInstance = new App();
       
      }
      return this.appInstance;
    }
  

    public getAppFactoryInstance(){return this.appFactoryInstance;}
    public setAppFactoryInstance(appFactoryInstance:AppFactory){this.appFactoryInstance=appFactoryInstance;}

  }
  




export default AppFactory;