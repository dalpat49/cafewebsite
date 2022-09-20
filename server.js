//required modules
const express = require("express");
const path = require("path");
const route = require("./routes/index");

const app = express();

//port and host
const port = process.env.PORT || 8000;
const host = "localhost";

//middlewares 
app.set(express.urlencoded({ extended: true }));
app.use(express.static("./static"));

//imported routes
app.use("/", route);
app.use("/booking", route);
app.use("/review", route);
app.use("/coffee", route);
app.use("/pizzas", route);
app.use("/burgers", route);
app.use("/shakes", route);


//server listing
app.listen(port, host, function () {
  console.log(`server has been started at ${port}`);
});
