const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserRoute = require('./Routes/UserRoute')
const ProductRoute = require('./Routes/ProductRoute')
const SalesRoute = require('./Routes/SalesRoute')
const VerifyJWT = require('./Middleware/VerifyJWT')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))  

try {
    mongoose.connect('mongodb://localhost:27017/IMS')
    console.log("DB connected Successfully");
} catch (error) {
    console.error()
}

app.use('/user', UserRoute)
app.use('/product', VerifyJWT, ProductRoute)
app.use('/sale', VerifyJWT, SalesRoute)

  
const PORT = 4000
  
app.listen(PORT, ()=>{
    console.log(`Server is running at: ${PORT}`);
})