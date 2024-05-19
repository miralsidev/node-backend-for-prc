const { mongoose } = require("mongoose");
require("dotenv").config();
// const {router} = require("./routes/User")
db_url = process.env.db_url;
port = process.env.port;
const express = require("express");
const app = express();
const connectdb = async (db_url) => {
  const db_option = {
    dbname: process.env.dbname,
  };
  mongoose
    .connect(db_url, db_option)
    .then(() => {
      console.log("connection successfully..!!");
      app.use(express.json());
    //   app.use("/api",router)
      app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
      );
    })
    .catch((error) => {
      console.log("error connecting to mongodb:", error);
    });
};
connectdb(db_url);
