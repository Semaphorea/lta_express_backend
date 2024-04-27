//Si client_id et app secret dans une variable d'environnement

import { environnment } from "../../Configuration/Environnement/environnement.ts";
 

import { RequestInfo, RequestInit } from 'node-fetch';
//import fetch from "node-fetch";
//const fetch = (url: RequestInfo, init?: RequestInit) =>  import('node-fetch').then(({ default: fetch }) => fetch(url, init));
//const { CLIENT_ID_PAYPAL, APP_SECRET_PAYPAL } = process.env;

  
  


export class PaypalController{  
   
  static CLIENT_ID_PAYPAL=environnment.paypalAPI.CLIENT_ID_PAYPAL;  
  static APP_SECRET_PAYPAL=environnment.paypalAPI.APP_SECRET_PAYPAL;
    
    // For a fully working example, please see:
    // https://github.com/paypal-examples/docs-examples/tree/main/standard-integration
   
    constructor(){}  
  
   

//////////////////////
// PayPal API helpers
//////////////////////

// use the orders api to capture payment for an order
async capturePayment(orderId:any) {
  const accessToken = await this.generateAccessToken();
  const url = `${environnment.paypalAPI.paypalURL}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;  
}


// use the orders api to create an order
async  createOrder(order:any) { 
    const accessToken = await this.generateAccessToken();
  //  const url = `${environnment.paypalURL}/v2/checkout/orders`;
    

  
    
    // cart: [
      //   {
        //     sku: "1",    //"YOUR_PRODUCT_STOCK_KEEPING_UNIT",
        //     quantity:"1" ,// "YOUR_PRODUCT_QUANTITY",
        //      currency_code:"EUR", //USD, EUR, 
        //     //hypothèse:
        //     //business:"", //email of paypal account
        
        //     tax_cart:this.commande.TVA, 
        //     price:this.commande.totalHT,
        
        //     item_name_1:this.commande.reference, 
        //   }
        
       // console.log("Server paypalController L66 : ",order);

        order=order.cart[0];

        //body: JSON.stringify({ "intent": "CAPTURE", 
        // "purchase_units": [ { "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b",
        // "amount": { "currency_code": "USD", "value": "100.00" } } ],
        //  "payment_source": 
                    // { "paypal": { "experience_context": 
                            //  { "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED", 
                            //"brand_name": "EXAMPLE INC", 
                            //"locale": "en-US", 
                            //"landing_page": "LOGIN",
                            // "shipping_preference": "SET_PROVIDED_ADDRESS",
                            // "user_action": "PAY_NOW", 
                            //"return_url": "https://example.com/returnUrl",
                            // "cancel_url": "https://example.com/cancelUrl" } } } })
                            
                            
                            
                            const url = `${environnment.paypalAPI.paypalURL}/v2/checkout/orders`;
                            
                            let orderForm={ 
                              intent: "CAPTURE",
                              purchase_units: [  
                                
             {  
               reference_id:order.item_name_1,
               amount: {
                 currency_code: order.currency_code,  
                 value: order.price,    
                 
                }}   ],
               // "breakdown": {
                 //   "item_total": {
                   //       currency_code: order.currency_code,  
                   //     "value": order.price,    
                   //   },
                   //   "shipping": {
                     //       currency_code: order.currency_code,  
                     //     "value": order.shipping,    
                     //   },
                     //   "handling": {
                       //       currency_code: order.currency_code,  
                       //     "value": ""
                       //   },
                       //   "tax_total": {
                         //       currency_code: order.currency_code,  
                         //     "value": order.TVA
                         //   },
                         //   "insurance": {
                //       currency_code: order.currency_code,  
                //     "value": order.insurance
                //   },
                //   "shipping_discount": {
                //       currency_code: order.currency_code,  
                //     "value": "0"
                //   },
                //   "discount": {
                //       currency_code: order.currency_code,  
                //     "value": "0"
                //   }
                // }
                
                "shipping_tax": {
                  "currency_code":  order.currency_code, 
                  "value":  order.shipping_tax,   
                }, 
           
                "payment_source": {
                  "paypal": {     
                    "experience_context": {
                      "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                      "brand_name": "LTA",
                      "locale": "fr-FR",
                      "landing_page": "LOGIN",
                      // "shipping_preference": "SET_PROVIDED_ADDRESS",  
                      "user_action": "CONTINUE", 
                      "return_url":environnment.frontendURL+'/payment/success',
                      "cancel_url": environnment.frontendURL+'/payment/fail',
                    }}},
                    
                  };
                  
                  const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  
            //   'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a', (faculatatif) Id renforçant la sécurité valable 45 jours.  
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(orderForm),
        });
        const data = await response.json();  
        return data;
      }

      // generate an access token using client id and app secret
      async  generateAccessToken() {
        
  
  // console.log("Server paypalController L98 ,CLIENT_ID_PAYPAL : ",PaypalController.CLIENT_ID_PAYPAL);  
  // console.log("Server paypalController L99 , APP_SECRET_PAYPAL: ",PaypalController.APP_SECRET_PAYPAL);   
  
  const auth = Buffer.from(PaypalController.CLIENT_ID_PAYPAL+ ":" + PaypalController.APP_SECRET_PAYPAL).toString("base64");
  
  //console.log("Server paypalController L102 : ",auth);  
  const response = await fetch(`${environnment.paypalAPI.paypalURL}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data:any = await response.json();
  return data.access_token;  
}




}
