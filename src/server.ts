import express from 'express'
import nodemailer from 'nodemailer'

import { prima } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "804007f466496f",
    pass: "1420790196a635"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prima.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Abner Willys <abwillys001@gmail.com>',
    subject: 'Novo Feedback',
    html: [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
      `<p>Feedback Type: ${type}</p>`,
      `<p>Comment: ${comment}</p>`,
      '</div>',
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => console.log('HTTP server is Running...🚀'))
