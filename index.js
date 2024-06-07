require("dotenv").config();

const cors = require('cors');
const userRoute = require("./routes/User")
const adminRoute = require("./routes/admin")
const carsRoutes = require('./routes/cars')
const blogRoutes = require('./routes/Blog')
const ContactRoutes = require('./routes/Contact')
const BookingsRoute = require('./routes/Booking')
const port = process.env.PORT;
const connectDb = require('./database/db-con')
const express = require("express");
const app = express();


const path = require('path');
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(cors());
app.use(express.json());
app.use('/admin', adminRoute)
app.use('/api', userRoute)
app.use('/cars', carsRoutes)
app.use('/blog', blogRoutes)
app.use('/Contact', ContactRoutes)
app.use('/Booking', BookingsRoute)

connectDb.then(() => {
  app.listen(port, () => {
    console.log("server start ", port)
  })
})