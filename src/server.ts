import express from 'express'
import { prima } from './prisma'

const app = express()

app.use(express.json())

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prima.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => console.log('HTTP server is Running...🚀'))
