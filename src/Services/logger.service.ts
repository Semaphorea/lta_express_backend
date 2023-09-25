

export class LoggerService {

  
  log(message: any) {
    console.log(message);
  }

  error(message: any) {
    console.error(message);
  }

  warn(message: any) {
    console.warn(message);
  }

  public printStackTrace(){
    var e= new Error();
  
    var stack = e.stack?.toString().split(/\r\n|\n/);
    if (stack != undefined){
       
          stack.forEach(element => {
            console.log(element+"\r\n");
          });
        
    }
    
   

  }
   
  public printLineTrace(error:string){
    var e= new Error();
    var stack = e.stack?.toString().split(/\r\n|\n/);
    if (stack != undefined){
      let line=stack[1].slice(stack[1].length-5,stack[1].length);
    console.debug("line:"+line, error  );
    }

  }

  public printLineTraceOb(error:object){
    var e= new Error();
    var stack = e.stack?.toString().split(/\r\n|\n/);
    if (stack != undefined){
      let line=stack[1].slice(stack[1].length-5,stack[1].length);
    console.debug("line:"+line, error  );
    }

  }


}