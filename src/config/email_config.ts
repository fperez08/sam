import type Mail from 'nodemailer/lib/mailer';
export const TRANSPORTER_CONFIG = {
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_EMAIL_PASSWORD,
  },
};

export const EMAIL_OPTIONS: Mail.Options = {
  from: process.env.FROM_EMAIL,
  to: process.env.TO_EMAIL,
  subject: 'Products on Sale',
};

export const SALES_EMAIL_TABLE_HEADERS: string[] = [
  'name',
  'productPromotions',
  'lastPrice',
  'finalPrice',
  'saleExpiresAt',
  'discount',
  'priceDifference',
];
