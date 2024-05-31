require("dotenv").config();
// const { mongoose } = require("mongoose");
const cors = require('cors');
const userRoute = require("./routes/User")
const adminRoute = require("./routes/admin")
const carsRoutes = require('./routes/cars')
const blogRoutes = require('./routes/Blog')
const port = process.env.PORT;
const connectDb = require('./database/db-con')
const express = require("express");
const app = express();

// const dirname = require('path')
const path = require('path');
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(cors());
app.use(express.json());
app.use('/admin', adminRoute)
app.use('/api', userRoute)
app.use('/cars', carsRoutes)
app.use('/blog',blogRoutes)

connectDb.then(() => {
  app.listen(port, () => {
    console.log("server start ", port)
  })
})