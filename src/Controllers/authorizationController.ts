
import fs from 'fs';
import * as jwt from 'jsonwebtoken';
export default class Authorization {


    private token?: string;

    constructor(...args: string[] | any[]) {
        let nbargs = args.length;

        switch (nbargs) {
            case 0: ; break;
            case 1: (token: string) => { this.token = token; }; break;
        }

    }


    checkAuthorisation() {  
        if (this.token != undefined) {
            var cert = fs.readFileSync((global as any).APP_ROOT_PATH + '/Configuration/Securite/Certificate/AuthorizationAPI/private.key');
            jwt.verify(this.token, cert,function(err, decoded) {
                console.log(decoded);   //Vérification asynchrone si callback

                if (err) {                      
                      err = {  
                        name: 'TokenExpiredError',
                        message: 'jwt expired',
                        expiredAt: new Date( new Date('now') .getUTCSeconds() +  1408621000),
                        inner: {
                            name: err.name,
                            message: err.message
                        }
                      }                    
                  }}
            );
        }  
    }





}