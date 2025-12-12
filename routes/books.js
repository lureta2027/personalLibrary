const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const Book = require("../models/Book");

router.get("/", function (req, res) {
   Book.find().sort({ createdAt: -1 }).then(function (books) {
      res.render("index", { books: books });
   });
});

router.post("/add", function (req, res) {
   const searchTitle = req.body.searchTitle;
   const status = req.body.status;
   const rating = req.body.rating;
   const notes = req.body.notes;

   const url =
      "https://openlibrary.org/search.json?title=" +
      encodeURIComponent(searchTitle);

   fetch(url)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         let doc = null;

         if (data && data.docs && data.docs.length > 0) {
            doc = data.docs[0];
         }

         let title = searchTitle;
         let author = "";
         let year = "";
         let coverUrl = "";

         if (doc) {
            if (doc.title) {
               title = doc.title;
            }
            if (doc.author_name && doc.author_name.length > 0) {
               author = doc.author_name[0];
            }
            if (doc.first_publish_year) {
               year = String(doc.first_publish_year);
            }
            if (doc.cover_i) {
               coverUrl =
                  "https://covers.openlibrary.org/b/id/" +
                  doc.cover_i +
                  "-M.jpg";
            }
         }

         const book = new Book({
            searchTitle: searchTitle,
            title: title,
            author: author,
            year: year,
            coverUrl: coverUrl,
            status: status,
            rating: rating,
            notes: notes,
         });

         return book.save();
      })
      .then(function () {
         res.redirect("/");
      });
});

router.post("/update-status", function (req, res) {
   const id = req.body.id;
   const status = req.body.status;

   Book.findByIdAndUpdate(id, { status: status }).then(function () {
      res.redirect("/");
   });
});

module.exports = router;
