export const environnment = {
  production: false,
  backendAPI: 'localhost:3000/',
  frontendURL: 'localhost:4200/',
  apiKey: 'devKey',
  env: 'dev',
  paypalAPI: {
    CLIENT_ID_PAYPAL: 'AS18aeFMAxFih_2bYiHEpfmDzSKum0m6G7k8QC2R3l9fQ8bQAnAsTdZfM2DKhIGmRgUR75rXZumtDh79',
    APP_SECRET_PAYPAL: 'ECIB5oknLBhfgdjY58yMGYj6heF_5JwT3JjcLXt5PuaMHPtd0LVEPCw-HmCm0P4qQIba59vemXOKN92',
    paypalURL: "https://api-m.sandbox.paypal.com"
  },
  mailsender: {
    addressrecipient:'semaphorea@protonmail.com',  
    mailtrap : {
      SMTPCredential:'bd1f252ebafcea23ac5c9cfd4663d721', 
      SMTPuser: 'c5574eeecb636b',
      SMTPpassword: 'c6e5fe42b61c0b',
      SMTPServer: 'sandbox.smtp.mailtrap.io',
      SMTPPort :2525, //25,467,587 possibles 
    },
    gmail:{
      SMTPServer : "smtp.gmail.com",
      SMTPPort : 587,
      SMTPUsername : "yourgmailusername",
      SMTPPassword : "yourgmailpassword",
 }

}
};

export const dataBaseConf = {
  identifiant: '',
  password: ''

} 