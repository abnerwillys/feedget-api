import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "804007f466496f",
    pass: "1420790196a635"
  }
})

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Team Feedget <hello@feedget.com>',
      to: 'Abner Willys <abwillys001@gmail.com>',
      subject,
      html: body,
    })
  }
}