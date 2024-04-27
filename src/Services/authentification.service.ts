 import  jwksRsa, { GetVerificationKey }  from 'jwks-rsa';
//const jwksRsa = require( 'jwks-rsa');
import  { expressjwt } from 'express-jwt';
import { environnment } from '../../Configuration/Environnement/environnement.ts'; 

import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';



// const jwtCheck = expressjwt({
//     secret: (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, header: any, payload: any, done: (err: any, secret?: jwksRsa.secretType | undefined) => void) => {
//       jwksRsa.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
//       })(req, header, payload, done)
//         .then((key: any) => key)
//         .catch((err: any) => done(err));
//     },
//     audience: process.env.AUTH0_AUDIENCE,
//     issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//     algorithms: ["RS256"],
//   });
 
//JWKS key rotation
export const checkIfAuthenticated = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: environnment.backendAPI+"/.well-exposed/jwks.json"  
    }) as GetVerificationKey,   
    algorithms: ['RS256']
});


/**
* Use it in fichier route.ts:  
* app.route('/api/lessons')
*    .get(checkIfAuthenticated, readAllLessons);
*/
