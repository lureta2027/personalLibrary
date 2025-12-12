const path = require("path");
require("dotenv").config({
   path: path.resolve(__dirname, "credentialsDontPost/.env"),
});

const express = require("express");
const mongoose = require("mongoose");
const booksRouter = require("./routes/books");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", booksRouter);

/* CMSC335-style IIFE */
(async () => {
   const uri = process.env.MONGO_CONNECTION_STRING;

   try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");

      app.listen(port, function () {
         console.log("Server listening on port " + port);
      });
   } catch (e) {
      console.error(e);
   }
})();
