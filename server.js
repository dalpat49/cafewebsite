//required modules
const express = require("express");
const path = require("path");
const route = require("./routes/index");

const app = express();

//port and host
const port = process.env.PORT || 8000;

//middlewares 
app.set(express.urlencoded({ extended: true }));
app.use(express.static("./static"));
app.set("view engine", `pug`);

//imported routes
app.use("/", route);



//server listing
app.listen(port, function () {
  console.log(`server has been started at ${port}`);
});
