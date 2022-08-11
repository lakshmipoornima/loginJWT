const express=require('express')
const app=express()

const bodyParser = require('body-parser')
const morgan=require('morgan')
const routes=require('./routes/index')
const cookieParser=require('cookie-parser')

app.use(cookieParser())
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(routes)



app.listen(8800, () => {
    console.log("Server started listening on port 8800....");
})