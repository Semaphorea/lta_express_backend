
import { CommandeController } from '../src/Controllers/commandeController.js';
import { PaimentController } from '../src/Controllers/paimentController.js';
import { PaypalController } from '../src/Controllers/paypalController.js';
import { environnment } from "../Configuration/Environnement/environnement.js";
import  express , { Request, Response }  from 'express';  

//Pour fonction de paiement

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OHDFLD5NE1kAJymV2tjTuwLg5qDp9MSfkiI7kpTP7Q8XRxWGURSsKbDvbBRbww10sQaFMVurT6L9eMQ2B1Kyw4m00JYjygWOO'); 


const routerPaiement = express.Router();        


  

/* Header */
function setHeader(res: Response, methode: string) {  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', methode);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
   


  
/*POST Route Order Success*/
routerPaiement.get('/order/success/:session_id', async (req: any, res: any) => {
    setHeader(res, 'GET');
    console.log("Route Order Success");
    const session:any = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer:any = await stripe.customers.retrieve(session.customer);
    res.send(`
    <html>
    <body>  
    <h1>Thanks for your order, ${customer.name}!</h1>
    </body>
    </html>
    `);
  });
  

//Fonction de paiement
//Stripe
const YOUR_DOMAIN = environnment['frontendURL'];
const backendAPI = environnment['backendAPI'];
/*POST Create-Checkout-Session*/
routerPaiement.post('/create-checkout-session', async (req: any, res: any) => {


  let ret: Boolean = false;
  setHeader(res, 'POST');

  //console.log("index.ts L626 :"+req.header('content'));   
  let requestValue: any = req.body

  //console.log("index.ts L629", requestValue);
  let commandeController = new CommandeController();


  let ex = commandeController.setRequestCommande(requestValue);
  //console.log('index.ts L634 : ', ex);
  

  let adressSuccess = `http://${YOUR_DOMAIN}paiment/paimentStatus=success&?session_id={CHECKOUT_SESSION_ID}`;

  console.log(adressSuccess);
  const session = await stripe.checkout.sessions.create({

    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1OHDjRD5NE1kAJymq0Ia4dfK",
        // amount_total:ex.totalTTC,  
        quantity: 1,
        //  currency:"euro", 
        //   custom_fields:[["referencecommande",ex.reference]]
      },
    ],
    mode: 'payment',
    ui_mode: 'hosted',
    success_url: `http://${YOUR_DOMAIN}paiementconfirmation/paimentStatus=success&session_id={CHECKOUT_SESSION_ID}`,
    //success_url: `http://${backendAPI}order/success/session_id={CHECKOUT_SESSION_ID}`,    
    cancel_url: `http://${YOUR_DOMAIN}paiementconfirmation/paimentStatus=fail&?session_id={CHECKOUT_SESSION_ID}`,

    //client_reference_id:ex.idClient,  

  });


  //res.redirect(303, session.url);
  res.json({ sessionURL: session.url });
});



// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_472b7e2336faa5f66aed185efc75e419e3d9742da16516c7980650e7a2f8c141";

/*POST Webhook*/
routerPaiement.post('/webhook', express.raw({ type: 'application/json' }), (request: any, response: any) => {
  const sig = request.headers['stripe-signature'];

  let event;
  let paimentController = new PaimentController();
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err: any) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event invoice.payment_succeeded
      paimentController.handlePayment(invoicePaymentSucceeded); break;
    // ... handle other event types
    case 'invoice.payment_failed': const invoicePaymentFailed = event.data.object; paimentController.handlePayment(invoicePaymentFailed); response.status(200).json({ 'paimentStatus': "success" }); console.log("PaymentInvoce was successfull!"); break;
    case 'payment_intent.canceled': const intentPaymentCanceled = event.data.object; paimentController.handlePayment(intentPaymentCanceled); console.log("PaymentIntent was canceled!"); response.status(200).json({ 'paimentStatus': "failed" }); break;
    case 'payment_intent.succeeded': const intentPaymentSucceeded = event.data.object; paimentController.handlePayment(intentPaymentSucceeded); console.log("PaymentIntent was successfull!"); response.status(200).json({ 'paimentStatus': "success" }); break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.status(200).json({ received: true });
});





//Implementation ngx-stripe
/*POST Create-Checkout-Session2*/
routerPaiement.post('/create-checkout-session2', async (req: any, res: any) => {


  const backendAPI = environnment['backendAPI'];

  let ret: Boolean = false;
  setHeader(res, 'POST');

  //console.log("index.ts L626 :"+req.header('content'));   
  let requestValue: any = req.body

  //console.log("index.ts L629", requestValue);
  let commandeController = new CommandeController();


  let ex = commandeController.setRequestCommande(requestValue);
  //console.log('index.ts L634 : ', ex);  

  const session: any = await stripe.checkout.sessions.create({ 
    payment_method_types: ['card'], 
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: ex.articles[0].title,
          },
          unit_amount: 1,
        },
        quantity: ex.articles[0].quantity,
      },
    ],
    mode: 'payment',
    //    success_url: `http://${YOUR_DOMAIN}/paiment/sessionid=`+session.id,  
    success_url: `http://${backendAPI}/order/success`,
    cancel_url: `http://${backendAPI}/order/fail`,
  });

  res.json({ id: session.id });
});




/*POST Route Order Fail*/
routerPaiement.post('/order/fail', async (req: any, res: any) => {
  const session :any= await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer :any= await stripe.customers.retrieve(session.customer);

  res.send(`
  <html>
  <body>
  <p>
  ${customer.name}
  Nous n'avons pas été en mesure de finaliser votre achat, Veuillez réessayer ultérieurement!</p>
  <p>Si le problème persiste, veuillez prendre contact avec notre service client par téléphone au <a href="tel:0100000000">0100000000</a> ou par courriel à l'adresse :  <a href="mailto:serviceclient@laTekantique">serviceclient@laTekantique</a>.</p>
  </body>
  </html>
  `);
});




/*POST Create Verification Session*/
//Check customer identity    
routerPaiement.post('/create-verification-session', async (req: any, res: any) => {
  const verificationSession = await stripe.identity.verificationSessions.create({
    type: 'document',
    metadata: {
      user_id: '{{USER_ID}}',
    }
  });

  // Return only the session URL to the frontend
  res.json({ url: verificationSession.url });
});


/* GET Route Paypal */
routerPaiement.get("/paypal", async (req: any, res: any) => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  res.render("checkout", { clientId });
});


routerPaiement.post("/create-paypal-order", async (req: any, res: any) => {
  console.log("create paypal order L813 : body :  ", req.body);
  let paypalController = new PaypalController();

  //Les donnees d'expertise sont envoyés sans id  

  const order = await paypalController.createOrder(req.body);
  console.log("create paypal order  L819 , réponse serveur : ", order);
  res.status(200);
});



// capture payment & store order information or fullfill order
routerPaiement.post("/capture-paypal-order", async (req: any, res: any) => {

  let paypalController = new PaypalController();

  const { orderID } = req.params;
  const captureData = await paypalController.capturePayment(orderID);
  // TODO: store payment information such as the transaction ID
  res.json(captureData);
});


export default routerPaiement ;   