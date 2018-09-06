require('dotenv').config()
const env = process.env
const express = require('express')

const app = express()

app.use(express.static('resources'))
app.get('/config.js', (request, response) => {
  response.type('text/javascript').send(
    `var BSE_HOST='${env.BSE_HOST}';
var GEOCLIENT_URL='${env.GEOCLIENT_URL}?app_id=${env.GEOCLIENT_ID}&app_key=${env.GEOCLIENT_KEY}';`
  )
})

app.listen(3000)