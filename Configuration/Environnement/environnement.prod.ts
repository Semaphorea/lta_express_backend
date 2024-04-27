export const environnment = {

  production: true,
  backendAPI: 'nac',
  frontendURL: 'nac',
  apiKey: 'prodKey',
  env: 'prod',
  paypalAPI: {
    CLIENT_ID_PAYPAL: "",
    APP_SECRET_PAYPAL: "",
    paypalURL: "https://api-m.paypal.com"
  },
  mailsender: {
    addressrecipient:'semaphorea@protonmail.com',  
    mailtrap:{
    SMTPuser: 'c5574eeecb636b', 
    SMTPPassword: 'c6e5fe42b61c0b',
    SMTPServer: 'smtp-mailtrap.io'
  }, 
   gmail:{
    SMTPServer : "smtp.gmail.com",
    SMTPPort : 587,
    SMTPUsername : "yourgmailusername",
    SMTPPassword : "yourgmailpassword",
 }
}


};