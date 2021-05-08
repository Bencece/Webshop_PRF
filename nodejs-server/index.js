const express = require('express')
const app = express()
const bodyParser = require("body-parser");

var cors = require('cors')

const port = 3000

app.use(cors())
app.use(bodyParser.json());

app.use(express.static("../webshop-app/dist/webshop-app/"));

app.get('/', (req,res) => {
  res.sendFile("../webshop-app/dist/webshop-app/index.html")
});

app.listen(port, () => {
  console.log(`Yeah, a szerver fut! http://localhost:${port}`)
})
