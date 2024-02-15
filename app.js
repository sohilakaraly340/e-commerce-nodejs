require('dotenv/config')
const express=require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan =require('morgan')
const dbConnection = require('./db/database')
const productRouter =require('./router/productRouter')
const userRouter =require('./router/userRouter')
const categoryRouter =require('./router/categoriesRouter')
// const { auth } = require('./middleware/auth');

const ordeRouter =require('./router/orderRouter')
const searchRouter=require("./router/searchRouter")
const cors=require('cors')

//connection
dbConnection()

//parsing
app.use(bodyParser.json())
app.use(morgan('tiny'))

//to avoid cross
app.use(cors())
app.options('*',cors())
//router
const api=process.env.API_URL;

app.use(`${api}/products`,productRouter)
app.use(`${api}/users`,userRouter)
app.use(`${api}/categories`,categoryRouter)
app.use(`${api}/orders`,ordeRouter)
app.use(`${api}/search`,searchRouter)

//listen
const port=process.env.PORT||3005;
app.listen(port,()=>{
 console.log(`run on port ${port}`)
})