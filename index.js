require("dotenv").config();
// const { mongoose } = require("mongoose");
const cors = require('cors');
const userRoute = require("./routes/User")
const adminRoute = require("./routes/admin")
const carsRoutes = require('./routes/cars')
const port = process.env.PORT;
const connectDb = require('./database/db-con')
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/admin',adminRoute)
app.use('/api', userRoute)
app.use('/cars',carsRoutes)

connectDb.then(() => {
  app.listen(port, () => {
    console.log("server start ", port)
  })
})