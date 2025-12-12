const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
   searchTitle: { type: String, required: true },
   title: { type: String, required: true },
   author: { type: String },
   year: { type: String },
   coverUrl: { type: String },
   status: { type: String, default: "To Read" },
   rating: { type: Number, min: 1, max: 5 },
   notes: { type: String },
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", bookSchema);
