require('dotenv').config()

const express = require('express')

const app = express()

app.use(express.static('resources'))
app.get('/host.js', (request, response) => {
  response.type('text/javascript').send(`var BSE_HOST='${process.env.BSE_HOST}';`)
})

app.listen(3000)