import nodemailer, {type Transporter} from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
class EmailService {
  private transporter: Transporter;
  constructor(transporterOptions: SMTPTransport.Options) {
    this.transporter = nodemailer.createTransport(transporterOptions);
  }

  /**
   * Sends an email using the configured transporter.
   *
   * @param {Mail.Options} emailOptions - The options for the email to be sent.
   */
  public sendEmail(emailOptions: Mail.Options) {
    this.transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  }
}

export default EmailService;
