const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "credentialsDontPost/.env") });

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

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(function () {
   app.listen(port, function () {
      console.log("Server listening on port " + port);
   });
});
