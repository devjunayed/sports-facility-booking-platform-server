import express from 'express'

const app = express()
app.get('/', (req, res) => {
  // const a = 5;
  res.send({message: "Server is working"})
})
export default app
