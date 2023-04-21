const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db")
mongoDB;

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
 // res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api',require("./routess/Createuser"))
app.use('/api',require("./routess/Displaydata"))
app.use('/api',require("./routess/Orderdata"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})