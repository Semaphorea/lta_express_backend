export const environnment = {
  production: false,
  backendAPI: 'localhost:3000/',
  frontendURL: 'localhost:4200/',
  apiKey: 'devKey',
  env: 'dev',
  paypalAPI: {
    CLIENT_ID_PAYPAL: 'personnal_id_paypal',
    APP_SECRET_PAYPAL: 'personnal_secret_paypal',
    paypalURL: "https://api-m.sandbox.paypal.com"
  },
  mailsender: {
    addressrecipient:'semaphorea@protonmail.com',  
    mailtrap : {
      SMTPCredential:'bd1f252ebafcea23ac5c9cfd4663d721', 
      SMTPuser: 'personnal_identifiant',
      SMTPpassword: 'password',
      SMTPServer: 'sandbox.smtp.mailtrap.io',
      SMTPPort :2525, //25,467,587 possibles 
    },
  gmail:{
     SMTPCredential : "",
     SMTPServer : "smtp.gmail.com",
     SMTPPort : 587, 
     SMTPUsername : "yourgmailusername",
     SMTPPassword : "yourgmailpassword",  
  }

}
};



export const dataBaseConf = {
  db: 'Latekantique',
  host: 'localhost',
  identifiant: '',
  password: ''

}  
