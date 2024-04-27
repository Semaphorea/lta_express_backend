export const environnment = {
  production: false,
  backendAPI: 'localhost:3000/',
  frontendURL: 'localhost:4200/',
  apiKey: 'devKey',
  env: 'dev',
  paypalAPI: { 
    CLIENT_ID_PAYPAL: 'AS18aeFMAxFih_2bYiHEpfmDzSKum0m6G7k8QC2R3l9fQ8bQAnAsTdZfM2DKhIGmRgUR75rXZumtDh79',
    // APP_SECRET_PAYPAL:'ECIB5oknLBhfgdjY58yMGYj6heF_5JwT3JjcLXt5PuaMHPtd0LVEPCw-HmCm0P4qQIba59vemXOKN92'
    APP_SECRET_PAYPAL: 'ECIB5oknLBhfgdjYJ8yMGYj6heF_5JwT3JjcLXt5PuaMHPtd0LVEPCw-HmCm0P4qQIba59vemXOKN92i',
    paypalURL: "https://api-m.sandbox.paypal.com"
  },
  mailsender: { 
    addressrecipient:'semaphorea@protonmail.com',  
    mailtrap:{
    SMTPCredential:'bd1f252ebafcea23ac5c9cfd4663d721',
    SMTPUsername: 'c5574eeecb636b',
    SMTPPassword: 'c6e5fe42b61c0b',
    SMTPServer: 'sandbox.smtp.mailtrap.io',
    SMTPPort : 2525,  
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