import cors from 'cors'
import express, { Request, Response } from 'express'
import { sampleProducts } from './data'

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5174'],
  })
)

app.use('/api/products', productRouter)
app.use('/api/seed', seedRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
