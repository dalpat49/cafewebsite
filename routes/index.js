//required modules
const express = require("express");
const { each } = require("jquery");
const path = require("path");
const { nextTick } = require("process");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongo = require("mongo");

const route = express.Router();

//mongoose connectionss
const db = "mongodb+srv://dalpat09:ravindra@marverlacafe.hxynj4c.mongodb.net/marvelcafe?retryWrites=true&w=majority"

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => {

  console.log("connection succesfull")

}).catch((err) => console.log(err));


//moongoose booking form schemas
const bookingformSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  date: { type: Date },
  occassion: String,
});

//moongoose review form schema
const reviewformSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  review: String,
});

//moongoose contact form schema
const contactusformSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
});

//moongoose booking form data model
const bookingformdata = mongoose.model("bookingformdata", bookingformSchema);
//moongoose review form data model
const reviewformdata = mongoose.model("reviewformdata", reviewformSchema);

//moongoose contactus form data model
const contactusformdata = mongoose.model("contactusformdata",contactusformSchema);

//middlewears used
route.use(express.urlencoded({ extended: true }));
route.use("./static", express.static("./static"));
route.use(bodyParser.urlencoded({ extended: false }));
route.use(bodyParser.json());

//home page
route.get("/", (req, res) => {
  res.status(200).sendFile(__dirname, "/index");
});

route.post("/", (req, res) => {
  (fullname = req.body.name),
    (email = req.body.email),
    (number = req.body.number);

  //moongoose contactus forms data insertion
  contactusformdata.insertMany({
    fullname: fullname,
    email: email,
    number: number,
  });

res.redirect("/");
});

//boking page
route.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/booking.html"));
});

//booking-form data
route.post("/booking", (req, res) => {
  (fullname = req.body.name),
    (email = req.body.email),
    (number = req.body.number),
    (date = req.body.date),
    (occassion = req.body.occassion);

  //moongoose booking forms data insertion
  bookingformdata.insertMany({
    fullname: fullname,
    email: email,
    number: number,
    date: date,
    occassion: occassion,
  });

  res.redirect("/booking/thankyou");
});

//booking form data send
route.get("/booking/thankyou", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/booking-form-filled.html"));
});

//review form
route.get("/review", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/review.html"));
});

//review-form data send
route.post("/review", (req, res) => {
  (fullname = req.body.name),
    (email = req.body.email),
    (number = req.body.number),
    (review = req.body.review);
  //review form data inserted into database
  reviewformdata.insertMany({
    fullname: fullname,
    email: email,
    number: number,
    review: review,
  });

  res.redirect("/review/formsubmitted");
});

//review form data submitted
route.get("/review/formsubmitted", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/review-form-filled.html"));
});

//coffee page
route.get("/coffee", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/coffee.html"));
});

//pizza page
route.get("/pizzas", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/pizza.html"));
});

//burgers page
route.get("/burgers", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/burger.html"));
});

//shakes page
route.get("/shakes", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/shakes.html"));
});

module.exports = route;
