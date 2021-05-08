const express = require('express')
const app = express()
const bodyParser = require("body-parser");

var cors = require('cors')

const port = 3000

app.use(cors())
app.use(bodyParser.json());

app.use(express.static(process.cwd()+"/my-app/dist/angular-nodejs-example/"));

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/my-app/dist/angular-nodejs-example/index.html")
});

app.listen(port, () => {
  console.log(`Yeah, a szerver fut! http://localhost:${port}`)
})
