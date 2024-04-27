import { ArticleController } from '../src/Controllers/artlcleController.js';
import { ManageDonnees } from '../src/Services/manageDonnees.service.js';
import { AddressController } from '../src/Controllers/addressController.js';
import { EmailController } from '../src/Controllers/emailController.js';
import { ExpertiseController } from '../src/Controllers/expertiseController.js';
import { UserController } from '../src/Controllers/userController.js';
import { CommandeController } from '../src/Controllers/commandeController.js';
import { ClientController } from '../src/Controllers/clientController.js';
import { authentificationController } from "../src/Controllers/authentificationController.js";
import cors from 'cors';





import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
  

import bodyParser from 'body-parser';  
import express, { Application, Request, Response, NextFunction } from 'express';
      
// export var router = app.router(['caseSensitive']);  
// import  app  from '../bin/server.ts';

 

     
     const router = express.Router();     
     const manageDonnees = new ManageDonnees();
     


//router.use('/proxy2', proxy('www.tf1.fr'));       






router.use(bodyParser.urlencoded({ extended: false }));
//router.use(express.json);
let accesDonnees = 'mock';

/* Header */
function setHeader(res: Response, methode: string) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', methode);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}



/* GET home page. */
router.get('/', function (req: Request, res: Response, next: any) {
  res.render('index', { title: 'Express' });
});


 


/*GET Address & Address Id */
router.get('/address', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('address');
  accesDonnees == "mock" ? manageDonnees.findAllFromMock(res) : 'bdd';
})


router.get('/address/last-id', (req: Request, res: Response) => {
  setHeader(res, 'GET');
 

  let addressController: AddressController = new AddressController();
  // console.log("Index.tx L226 : ",expController);    
  let ret = addressController.fetchLastId(accesDonnees);
  res.status(200).json({ id: ret });
})




router.get('/address/:id', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  manageDonnees.instantiateProperties('address');
  // console.log("Index.ts L218",req);
  accesDonnees == "mock" ? manageDonnees.findFromMockById(req, res) : 'bdd';
});




/*POST  Address Create */
router.post('/address/create', async (req: Request, res: Response) => {
  let ret: Boolean = false;
  setHeader(res, 'POST');

  //console.log("index.ts L251 :"+req.header('content'));   
  let requestValue: any = req.body

  console.log("index.ts L254", requestValue);
  //if(requestValue==undefined){requestValue=null;}
  let addressController = new AddressController();


  //Les donnees address sont envoyés sans id
  let ex = addressController.setRequestAddress(requestValue);
  console.log('index.ts L261 : ', ex);

  let promise: Promise<Boolean> = addressController.persist(accesDonnees);
  promise.then((rea) => { ret = rea; res.status(200).json({ 'Address Created': ret }); });

}
)



/*GET Address Delete */
router.get('/address/delete/:id', (req: Request, res: Response) => {
  setHeader(res, 'POST');
  let ret: Boolean = false;
  let expController: AddressController = new AddressController();
  ret = expController.deleteAddress(accesDonnees, Number.parseInt(req.params.id));

  ret ? res.status(200).json("{ \"Address " + req.params.id + "\" : \"deleted\" }") : res.status(200).json("{ \"Address  " + req.params.id + "\" : \"no deleded\"}");
}
)

 

/*GET Address Delete */
router.get('/address/delete/:id', (req: Request, res: Response) => {
  setHeader(res, 'POST');
  let ret: Boolean = false;
  let expController: AddressController = new AddressController();
  ret = expController.deleteAddress(accesDonnees, Number.parseInt(req.params.id));

  ret ? res.status(200).json("{ \"Address " + req.params.id + "\" : \"deleted\" }") : res.status(200).json("{ \"Address  " + req.params.id + "\" : \"no deleded\"}");
}
)



/*GET Articles & Articles Id */
router.get('/articles', (req: Request, res: Response) => {

  manageDonnees.instantiateProperties('articles');  
  accesDonnees == "mock" ? manageDonnees.findAllFromMock(res) : 'bdd';
})


router.get('/articles/last-id', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  let articleController: ArticleController = new ArticleController();
  // console.log("Index.tx L284 : ",expController);    
  let ret = articleController.fetchLastId(accesDonnees);
  res.status(200).json({ id: ret });
})


router.get('/articles/:id', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('articles');
  console.log(manageDonnees.typeElementJson);
  accesDonnees == "mock" ? manageDonnees.findFromMockById(req, res) : 'bdd';
});


/*POST  Article Create */
router.post('/articles/create', async (req: Request, res: Response) => {
  let ret: Boolean = false;
  setHeader(res, 'POST');

  // console.log("index.ts L304 :"+req.header('content'));    
  let requestValue: any = req.body

  // console.log("index.ts L307", requestValue);

  let articleController = new ArticleController();



  //Les donnees client sont envoyés sans id
  let ex = articleController.setRequestArticle(requestValue);
   console.log('index.ts L315 : ', ex);

  let promise: Promise<Boolean> = articleController.persist(accesDonnees);
  promise.then((rea) => { ret = rea; res.status(200).json({ 'ArticleCreated': ret }); });
 
}
)



/*GET Commande Delete */
router.get('/address/delete/:id', (req: Request, res: Response) => {
  setHeader(res, 'POST');
  let ret: Boolean = false;
  let expController: CommandeController = new CommandeController();
  ret = expController.deleteCommande(accesDonnees, Number.parseInt(req.params.id));

  ret ? res.status(200).json("{ \"Commande " + req.params.id + "\" : \"deleted\" }") : res.status(200).json("{ \"Commande  " + req.params.id + "\" : \"no deleded\"}");
}
)



/*GET Client & Client Id */
router.get('/clients', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('clients');
  accesDonnees == "mock" ? manageDonnees.findAllFromMock(res) : 'bdd';
})



router.get('/clients/last-id', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  let clientController: ClientController = new ClientController();
  // console.log("Index.tx L226 : ",expController);    
  let ret = clientController.fetchLastId(accesDonnees);
  res.status(200).json({ id: ret });
})


/*POST  Client Create */
router.post('/clients/create', async (req: Request, res: Response) => {
  let ret: Boolean = false;
  setHeader(res, 'POST');

  // console.log("index.ts L360 :"+req.header('content'));   
  let requestValue: any = req.body

  // console.log("index.ts L363", requestValue);

  let clientController = new ClientController();  


  //Les donnees client sont envoyés sans id
  let ex = clientController.setRequestClient(requestValue);
  // console.log('index.ts L370 : ', ex);

  let promise: Promise<Boolean> = clientController.persist(accesDonnees);
  promise.then((rea) => { ret = rea; res.status(200).json({ 'ArticleCreated': ret }); });
}
)

router.get('/clients/:id', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  manageDonnees.instantiateProperties('clients');
  // console.log("Index.ts L382",req);
  accesDonnees == "mock" ? manageDonnees.findFromMockById(req, res) : 'bdd';
});




/*GET Client Delete */
router.get('/clients/delete/:id', (req: Request, res: Response) => {
  setHeader(res, 'POST');
  let ret: Boolean = false;
  let expController: ClientController = new ClientController();
  ret = expController.deleteClient(accesDonnees, Number.parseInt(req.params.id));

  ret ? res.status(200).json("{ \"Client " + req.params.id + "\" : \"deleted\" }") : res.status(200).json("{ \"Client  " + req.params.id + "\" : \"no deleded\"}");
}
)



/*GET Expert & Expert Id */
router.get('/experts', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('experts');
  accesDonnees == "mock" ? manageDonnees.findAllFromMock(res) : 'bdd';
})

router.get('/experts/:id', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('experts');
  accesDonnees == "mock" ? manageDonnees.findFromMockById(req, res) : 'bdd';
}
);


/*GET Expertise & Expertise Id */
router.get('/expertises', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('expertises');
  accesDonnees == "mock" ? manageDonnees.findAllFromMock(res) : 'bdd';
})

router.get('/expertises/:id', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('expertises');
  accesDonnees == "mock" ? manageDonnees.findFromMockById(req, res) : 'bdd';
});


/*GET Expertise Delete */
router.get('/expertise/delete/:id', (req: Request, res: Response) => {

  setHeader(res, "GET");

  let ret: Boolean = false;
  let expController: ExpertiseController = new ExpertiseController();
  ret = expController.deleteExpertise(accesDonnees, Number.parseInt(req.params.id));

  ret ? res.status(200).json("{ \"Expertise " + req.params.id + "\" : \"deleted\" }") : res.status(200).json("{ \"Expertise  " + req.params.id + "\" : \"no deleded\"}");
}
)

/*POST Expertise Last-Id */
router.post('/expertise/last-id', (req: Request, res: Response) => {

  setHeader(res, "POST");

     
      console.log("Coucou");
      console.log(__dirname);   
  let expController: ExpertiseController = new ExpertiseController();

  let ret = expController.fetchLastId(accesDonnees);
  res.status(200).json({ id: ret });

})

/*POST Expertise Submit-Form */
router.post('/expertise/submit-form', async (req: Request, res: Response) => {
  let ret: Boolean = false;

  setHeader(res, "POST");

  //console.log("index.ts L58 :"+req.header('content')); 
  let requestValue: any = req.body

  console.log("index.ts L102", requestValue);
  //if(requestValue==undefined){requestValue=null;}
  let expertiseController = new ExpertiseController();  


  //Les donnees d'expertise sont envoyés sans id
  let ex = expertiseController.setRequestExpertise(requestValue);
  //  console.log('index.ts L108 /expertise/submit-form');   
  console.log('index.ts L112 : ', ex);

  let promise: Promise<Boolean> = expertiseController.persist(accesDonnees);
  promise.then((rea) => { ret = rea; res.status(200).json({ 'submit-form': ret }); });

}
)


/*POST Expertise Update*/
router.post('/expertise/update', async (req: Request, res: Response) => {
  let ret: Boolean = false;

  setHeader(res, "POST");
  //console.log("index.ts L58 :"+req.header('content')); 
  let requestValue: any = req.query;

  if (requestValue == undefined) { requestValue = null; }
  let expertiseController = new ExpertiseController();
  let ex = expertiseController.setRequestExpertise(req.query);
  //console.log(ex);

  let promise: Promise<Boolean> = expertiseController.update(accesDonnees);
  promise.then((rea) => { ret = rea; res.status(200).json("{\"" + ret + "\"}"); });

}
)
/*POST Expertise */
router.get('/expertise/submit-form', async (req: Request, res: Response) => {
  let ret: Boolean = false;

  setHeader(res, "GET");

  //console.log("index.ts L58 :"+req.header('content')); 
  let requestValue: any = req.query;

  if (requestValue == undefined) { requestValue = null; }
  console.log("index.ts L148");
  console.error(requestValue);
  let expertiseController = new ExpertiseController();
  let ex = expertiseController.setRequestExpertise(req.query);
  console.log("index.ts L152");
  console.log(ex);

  let promise: Promise<Boolean> = expertiseController.persist(accesDonnees);
  promise.then((rea) => { ret = rea; res.status(200).json("{\"" + ret + "\"}"); });

}
)


/*GET Evenements & Evenements Id */
router.get('/evenements', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('evenements');
  accesDonnees == "mock" ? manageDonnees.findAllFromMock(res) : 'bdd';
})

router.get('/evenements/:id', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('evenements');
  accesDonnees == "mock" ? manageDonnees.findFromMockById(req, res) : 'bdd';
});


router.get('/experts/:id/:photo', (req: Request, res: Response) => {
  manageDonnees.instantiateProperties('experts');
  accesDonnees == "mock" ? manageDonnees.findFromMockById(req, res) : 'bdd';
});


router.get('/illustrations/:name', (req: Request, res: Response) => {
  manageDonnees.getImage(res, req, `../../assets/images/Illustrations/Default-Images`);
});


router.get('/photos/:name', (req: Request, res: Response) => {
  manageDonnees.getImage(res, req, `../../assets/images/Photos`);
});





/*GET Commande & Commande Id */
router.get('/commandes', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  manageDonnees.instantiateProperties('commandes');
  accesDonnees == "mock" ? manageDonnees.findAllFromMock(res) : 'bdd';
})



/*GET Commande Last-Id */
// ! L'ordre de déclaration est important
// Si nous plaçons la route /commandes/:id avant last-id Express utilise cette première route et nous n'obtenons pas l'id.
router.get('/commandes/last-id', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  let expController: CommandeController = new CommandeController();
  // console.log("Index.tx L226 : ",expController);    
  let ret = expController.fetchLastId(accesDonnees);
  res.status(200).json({ id: ret });
})



router.get('/commandes/last-reference', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  let expController: CommandeController = new CommandeController();
  // console.log("Index.tx L226 : ",expController);    
  let ret = expController.fetchLastReference(accesDonnees);
  res.status(200).json({ reference: ret });
})


router.get('/commandes/:id', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  manageDonnees.instantiateProperties('commandes');
  // console.log("Index.ts L218",req);
  accesDonnees == "mock" ? manageDonnees.findFromMockById(req, res) : 'bdd';
});

//commandes/id='+id+"&idClient="+idClient,'GET'
router.get('/commandes/:id/:idClient', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  manageDonnees.instantiateProperties('commandes');
  // console.log("Index.ts L218",req);
  accesDonnees == "mock" ? manageDonnees.findFromMockByIdandClient(req, res) : 'bdd';
});



/*POST  Commandes Create */
router.post('/commandes/create', async (req: Request, res: Response) => {
  let ret: Boolean = false;
  setHeader(res, 'POST');

  //console.log("index.ts L251 :"+req.header('content'));   
  let requestValue: any = req.body

  console.log("index.ts L254", requestValue);
  //if(requestValue==undefined){requestValue=null;}
  let commandeController = new CommandeController();


  //Les donnees d'expertise sont envoyés sans id
  let ex = commandeController.setRequestCommande(requestValue);
  console.log('index.ts L261 : ', ex);

  let promise: Promise<Boolean> = commandeController.persist(accesDonnees);
  promise.then((rea) => { ret = rea; res.status(200).json({ 'Commande Created': ret }); });

}
)


/*GET Commande Delete */
router.get('/commandes/delete/:id', (req: Request, res: Response) => {
  setHeader(res, 'GET');
  let ret: Boolean = false;
  let expController: CommandeController = new CommandeController();
  ret = expController.deleteCommande(accesDonnees, Number.parseInt(req.params.id));

  ret ? res.status(200).json("{ \"Commande " + req.params.id + "\" : \"deleted\" }") : res.status(200).json("{ \"Commande  " + req.params.id + "\" : \"no deleded\"}");
}
)






/*POST  Update*/
router.post('/commandes/update', async (req: Request, res: Response) => {
  let ret: Boolean = false;

  setHeader(res, "POST");

  //console.log("index.ts L275 :"+req.header('content')); 
  let requestValue: any = req.query;

  if (requestValue == undefined) { requestValue = null; }
  let commandeController = new CommandeController();
  let ex = commandeController.setRequestCommande(req.query);
  //console.log(ex);

  let promise: Promise<Boolean> = commandeController.update(accesDonnees);
  promise.then((rea) => { ret = rea; res.status(200).json("{\"" + ret + "\"}"); });

}
)

 
/*POST  Send Email*/
router.post('/sendemail', async (req: Request, res: Response) => {
  let ret: Boolean = false;
  setHeader(res, 'POST');

  let requestValue: any = req.body

  // console.log("index.ts L641", requestValue);
  let emailController = new EmailController('mailtrap', 'mailtrap');

  let ex = emailController.setRequestEmail(requestValue);
  console.log('index.ts L645 : ', ex);

  let promise: Promise<boolean> = emailController.send();
  promise.then((ret) => { res.status(200).json({ 'Email Sent': ret }); });

}
)



export default router;



  