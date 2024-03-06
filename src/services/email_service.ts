import nodemailer, {type Transporter} from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
class EmailService {
  private transporter: Transporter;
  constructor(transporterConfig: SMTPTransport.Options) {
    this.transporter = nodemailer.createTransport(transporterConfig);
  }

  /**
   * Sends an email using the configured transporter.
   *
   * @param {Mail.Options} mailOptions - The options for the email to be sent.
   */
  public sendEmail(mailOptions: Mail.Options) {
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  }
}

export default EmailService;
