import { Email } from "../Entitees/Entites/Email.ts";
//import { SMTPClient, Message } from 'emailjs';
import Nodemailer from 'nodemailer';
import { MailtrapTransport } from "mailtrap";
import { exec } from 'child_process'; 
import sendmail  from 'sendmail';

import { environnment } from "../../Configuration/Environnement/environnement.ts";


export class EmailController {

  private _email!: Email;
  private _transportertype!: string;  
  private transporter!: Nodemailer.Transporter;
  private message!: object;
  private smtp: string;


  constructor(smtp: string, transportertype: string) {
    this.smtp = smtp;
    console.log("transportertype", transportertype);
          switch (transportertype) {

            case 'mailtrap': (() => {
              this.transporter = Nodemailer.createTransport({
                host: environnment.mailsender.mailtrap.SMTPServer,
                port: environnment.mailsender.mailtrap.SMTPPort,
                auth: {
                  user: environnment.mailsender.mailtrap.SMTPUsername,
                  pass: environnment.mailsender.mailtrap.SMTPPassword
                }
              });
              // this.transporter = Nodemailer.createTransport(MailtrapTransport({
              //   token: environnment.mailsender.mailtrap.SMTPCredential
              // })) 
            }
            )(); break;

            case 'nodemailer': (() => {
              this.transporter = Nodemailer.createTransport({
                host: environnment.mailsender.mailtrap.SMTPServer,  //      "smtp.forwardemail.net",
                port: environnment.mailsender.mailtrap.SMTPPort,
                secure: true,
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: environnment.mailsender.mailtrap.SMTPUsername,
                  pass: environnment.mailsender.mailtrap.SMTPPassword,
                },
              });
            })(); break;

          }

  }  


  public instanciateMessage() {
    let message = {
      //   date:Date.now().toString, 
      from: this._email.address,
      to: this._email.recipientaddress ? this._email.recipientaddress : environnment.mailsender.addressrecipient,   //list of recipient
      subject: this._email.subject,
      text: this._email.message,
      html: "<p>" + this._email.message + "</p>",
      // attachments: this._email.attachment,   

    };

    this.message = message;
    return this.message;
  }


  public async send(): Promise<boolean> {

    this.instanciateMessage();
    const info = await this.transporter.sendMail(this.message);
    console.log("Message sent: %s", info.messageId);
    return true;

  }


  setRequestEmail(requestValue: any) {

    this.email = new Email({
      firstname: requestValue.firstname, lastname: requestValue.lastname, address: requestValue.address, subject: requestValue.subject,
      message: requestValue.message, ccaddresses: requestValue.ccaddresses, attachment: requestValue.attachment = []
    });

    return this.email;
  }




  public get email(): Email {
    return this._email;
  }
  public set email(value: Email) {
    this._email = value;
  }
  public get transportertype(): string {
    return this._transportertype;
  }
  public set transportertype(value: string) {
    this._transportertype = value;
  }

}  