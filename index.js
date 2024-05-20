require("dotenv").config();
// const { mongoose } = require("mongoose");
const cors = require('cors');
const userRoute = require("./routes/User")
const port = process.env.PORT;
const connectDb = require('./database/db-con')
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoute)

connectDb.then(() => {
  app.listen(port, () => {
    console.log("server start ", port)
  })
})