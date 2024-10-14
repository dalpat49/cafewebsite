//required modules
const express = require("express");
const { each } = require("jquery");
const path = require("path");
const { nextTick } = require("process");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongo = require("mongo");
const cookieparser = require("cookie-parser");
const multer = require("multer");
const flash = require("connect-flash");
const MongoStore = require('connect-mongo');
const session = require("express-session");
const { AsyncResource } = require("async_hooks");
const { stringify } = require("querystring");




const route = express.Router();

//mongoose connectionss
const db = "mongodb+srv://dalpat09:ravindra@marverlacafe.hxynj4c.mongodb.net/marvelcafe?retryWrites=true&w=majority"

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => {

  console.log("connection succesfull")

}).catch((err) => console.log(err));


//session setup
route.use(
  session({
      store: MongoStore.create({ mongoUrl:db}),
      secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
      saveUninitialized: true,
      resave: true,
      cookie: {
          secure: false,
          maxAge: 8*60*60*1000 ,
      },
  })
);

//multer setup
const storage = multer.diskStorage({
  destination: "static/img",
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});

//uplaod image to database
const upload = multer({
  storage: storage,
});

//setup middlewares
const app = express();
route.use(cookieparser());
route.use(express.urlencoded({ extended: true }));
route.use(express.static("./static"));
app.set("view engine", `pug`);
app.set(`views`, path.join(__dirname, `views`));
route.use(flash());
mongoose.set("strictQuery", false);



//auth login
const isLogin = async (req, res, next) => {
  try {
      if (req.session.user_sid) {
      } else {
          return res.redirect("/");
      }
      next();
  } catch (err) {
      res.status(400).send(err);
  }
};


//auth logout
const isLogout = async (req, res, next) => {
  {
      try {
          if (req.session.user_sid) {
              return res.redirect("/Home");
          }
          else{}
          next();
      } catch (err) {
                  return res.status(400).render("errorPage");
;
      }
  }
};

//admin login page
const isAdminLogin = async (req, res, next) => {
  try {
      if ( req.session.admin_id) { }
      else {
          return res.redirect("/")

      }
      next();
  }
  catch (err) {
              return res.status(400).render("errorPage");

  }
}
//Admin logout
const isAdminLogout = async (req, res, next) => {
  {
      try {
          if (req.session.admin_id) {
              return res.redirect("/")
          }
          next();
      }
      catch (err) {
                  return res.status(400).render("errorPage");

      }
  }
}


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

//admin model
const newAdmin = new mongoose.Schema({
  name:String,
  email:String,
  number:Number,
  company:String,
  role:String,
  password:String,
  image:String

})

//product 
const newProduct = new mongoose.Schema({
  productName: String,
  price:Number,
  category: String,
  image:Array,
  status:String
 });

 //category
const category = new mongoose.Schema({
  categoryName: String,
  category_id : Number,
  status:String,
})

//orderPgae
const orderPage = new mongoose.Schema({
  email: String,
  number:String,
  housenumber: String,
  colony: String,
  landmark: String,
  city: String,
  district: String,
  state: String,
  zipcode: Number,
  orderId:String,

});

const orders = new mongoose.Schema({
  name:String,
  email: String,
  number:String,
  housenumber: String,
  colony: String,
  city: String,
  district: String,
  state: String,
  zipcode: Number,
  orderId:String,
  orderPrice:String,
  orderName:String,

});
//moongoose booking form data model
const bookingformdata = mongoose.model("bookingformdata", bookingformSchema);
//moongoose review form data model
const reviewformdata = mongoose.model("reviewformdata", reviewformSchema);

//moongoose contactus form data model
const contactusformdata = mongoose.model("contactusformdata",contactusformSchema);
//admin model
const admin = mongoose.model("admin", newAdmin);
//product module
const product = mongoose.model("product", newProduct);
//alll categorys
const allCategories = mongoose.model("allCategories", category);
//address
const orderData = mongoose.model("orderData", orderPage);
const allOrders = mongoose.model("allOrders", orders);





//middlewears used
route.use(express.urlencoded({ extended: true }));
route.use("./static", express.static("./static"));
route.use(bodyParser.urlencoded({ extended: false }));
route.use(bodyParser.json());

//home page
route.get("/", (req, res) => {
  return res.render("index");
  // res.status(200).sendFile(__dirname, "/index");
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
  return res.render("booking");

  // res.sendFile(path.join(__dirname, "../static/booking.html"));
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
  return res.render("booking-form-filled");


  // res.sendFile(path.join(__dirname, "../static/booking-form-filled.html"));
});

//booking form data send
route.get("/order/thankyou", (req, res) => {
  return res.render("orderDone");


  // res.sendFile(path.join(__dirname, "../static/booking-form-filled.html"));
});

//review form
route.get("/review", (req, res) => {
  return res.render("review");

  // res.sendFile(path.join(__dirname, "../static/review.html"));
});

//review-form data send
route.post("/review", (req, res) => {
  (fullname = req.body.name),
    (email = req.body.email),
    (number = req.body.number),
    (review = req.body.review);
  //review form data inserted into database
  reviewformdata.insertMany({
    name: fullname,
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


//shakes page
route.get("/products", (req, res) => {
  return res.render('productPage');
  // res.sendFile(path.join(__dirname, "../static/shakes.html"));
});

//shakes page
route.get("/product/:id", async(req, res) => {
try{

  let getProductName = req.params.id;

  let allProductsByCategory = await product.find({category:getProductName});
  return res.render('productPage',{products:allProductsByCategory , title:getProductName});

  console.log(getProductName)
  

}
catch(err){
  console.log(err)
}
  // return res.render('productPage');
  // res.sendFile(path.join(__dirname, "../static/shakes.html"));
});

//ordde
route.get("/product/order/:id", async(req, res) => {
  try{

    let getId = req.params.id;
    let getProduct = await product.findById({_id:getId});
    return res.render("orderPage",{Data:getProduct});
  }
  catch(err){
    console.log(err)
  }

})

route.get("/soup", async(req, res) => {
  try{
    return res.render("soup");
  }
  catch(err){
    console.log(err)
  }

})
route.get("/add_cart", async(req, res) => {
  try{
    return res.render("add_cart");
  }
  catch(err){
    console.log(err)
  }

})
route.get("/signup", async(req, res) => {
  try{
    return res.render("signup");
  }
  catch(err){
    console.log(err)
  }

})

route.get("/login", async(req, res) => {
  try{
    return res.render("login");
  }
  catch(err){
    console.log(err)
  }

})
//ordde
route.post("/product/ordered/", async(req, res) => {
  try{
    const additemcategory = new allOrders({
      name: req.body.name,
      email: req.body.email,
      number:req.body.number,
      housenumber: req.body.housenumber,
      colony: req.body.colony,
      city: req.body.city,
      district: req.body.district,
      state: req.body.state,
      zipcode:req.body.zipcode,
      orderId:req.body.orderId,
      orderPrice:req.body.orderPrice,
      orderName:req.body.productName,
     }).save().then(
       res.redirect("/order/thankyou")
  )

  }
  catch(err){
    console.log(err)
  }

})





// ********************admin routes***********************///////

//admin Login page
route.get("/admin/adminLogin", (req, res) => {
  // if (req.session.admin_id) {
  //     return res.redirect("/admin/adminHome");
  // } else {
      return res.render(`adminLogin`)
  // }

});


//adminlogincheck
route.post("/admin/adminLoginCheck" , async(req, res) => {

  try {
      const email = req.body.email;
      const password = req.body.password;
      const adminEmail = await  admin.findOne({email:email});
      // const adminPasswordMatch =  await bcrypt.compare(password, adminEmail.password)

              if(password == adminEmail.password){
                   req.session.admin_id = email;
                   res.cookie("id", adminEmail._id, { expire: 1000 * 60 * 60 * 24 });
                   
                   return res.redirect('/admin/adminHome')
                  
              }
              else
              {
                  return res.render("adminLogin",{
                      type:"red",
                      err:"Invalid email or password"
                  })
              }

 
  }
  
  catch (err) {
    console.log(err)
              // return res.status(400).render("errorPage");
;
  }


});


//admin home page
route.get("/admin/adminHome", async (req, res) => {
  try {
      // const mydata = await user.find({});
      // const customerCount = await user.count({});
      const productCount = await product.count({});
      const categoryCount = await allCategories.count({});
      const ordersCount = await allOrders.count({});
      const admin_data= await admin.findOne({_id:req.cookies.id});
      // const tenOrders = await orders.find({}).sort({ length: -1 }).limit(10);
      // const ordersAll = await orders.aggregate([{$project:
      //     {year:{$year:"$date"},
      //     month:{$month:"$date"},
      //     date:{$dayOfMonth:"$date"}
      // }}]);
      // var orderID;
      // var newOrderId;
      // ordersAll.indexOf((e)=>{
      //   orderID= e.year + "" + e.month + ""+e.date;
      // })
      

      return   res.render("adminHome", {
        productNumber: productCount,
              categoryNumber: categoryCount ,
              adminDetails:admin_data,
              orders:ordersCount,
             
          });
  }
  catch (err) {
    console.log(err)
              // return res.status(400).render("errorPage");
  }
  
});

//allproducts in admin panel
route.get("/admin/allProducts", async (req, res) => {
  try {
      const all_product = await product.find({});
      const categorys = await allCategories.find({});
      const admin_data= await admin.findOne({_id:req.cookies.id});

    return  res.render("allProducts", { products: all_product,category: categorys,    adminDetails:admin_data  })
  }
  catch (err) {
    console.log(err)
              // return res.status(400).render("errorPage");
  }
});

//add product
route.get("/admin/addProduct", async (req, res) => {
  try {
      const categories = await allCategories.find({});
      const admin_data= await admin.findOne({_id:req.cookies.id});
      const newProductNofification = req.flash("product")
      return  res.render("add_product", { adminDetails:admin_data ,category: categories, message:newProductNofification });
  }
  catch (err) {
    console.log(err);
              // return res.status(400).render("errorPage");
  }
});
//item category
route.get("/admin/itemCategory",async (req, res) => {
  try {
      const categorys = await allCategories.find({});
      const category_count = await allCategories.count({})
      const admin_data= await admin.findOne({_id:req.cookies.id});

      return  res.render("itemCategory", { category: categorys,catCount:category_count,   adminDetails:admin_data  })
  }
  catch (err) {
    console.log(err);

              // return res.status(400).render("errorPage");

  }
});



//add new admin
route.post("/admin/addCategory", async (req, res) => {
  try {


      const additemcategory = new allCategories({
          categoryName: req.body.Cname,
          category_id: req.body.Category_id,
          status:req.body.radio,
      }).save().then(
          res.redirect("/admin/itemCategory")
      )


  }
  catch (err) {
              return res.status(400).render("errorPage");
;
  }
});

//dlt caytegory in admin panel
route.get("/admin/dltCategory/:id", async (req, res) => {
  try {
      let dltId = req.params.id;
      const dltCategory = await allCategories.findByIdAndDelete({ _id: dltId }).then(() => {
          res.redirect("/admin/itemCategory")
      })
  }
  catch (err) {
    console.log(err);
              // return res.status(400).render("errorPage");

  }
});


//add new oproduct from admin panel
route.post("/admin/addedProduct", upload.array("productImage"), async (req, res) => {
  try {
      const addProduct = new product({
          productName: req.body.productName,
          price: req.body.price,
          category: req.body.category,
          image: req.files.map(file => file.filename),
          status: req.body.radio
      })

      const productSAdded = await addProduct.save().then(() => {
       
            req.flash("product","Product added")
         return res.redirect("/admin/allProducts");
      })

  }
  catch (err) {
    console.log(err)
              // return res.status(400).render("errorPage");

  }

});


//dlt product in admin panel
route.get("/admin/dltProduct/:id", async (req, res) => {
  try {
      let dltProductId = req.params.id;
      const dltProducts = await product.findByIdAndDelete({ _id: dltProductId }).then(() => {
          res.redirect("/admin/allProducts");
      });
  }
  catch (err) {
    console.log(err)
              // return res.status(400).render("errorPage");
  }
})


//all orders
route.get("/admin/allOrders", async (req, res) => {
  try {
      let allOrderss = await allOrders.find({});
      const admin_data= await admin.findOne({_id:req.cookies.id});

      res.render("orders", { orders: allOrderss, adminDetails:admin_data})
  }
  catch (err) {
    console.log(err)
      // return res.status(400).render("errorPage");
  }
});


// //all customers/ user routes 
// route.get("/admin/users",isAdminLogin, async (req, res) => {
//   try {
//       const mydata = await user.find({});
//       const admin_data= await admin.findOne({_id:req.cookies.id});
//       let allUsers = req.flash("user")
//       return   res.render("users", { x: mydata,
//           adminDetails:admin_data,message:allUsers })
//   }
//   catch (err) {
//               return res.status(400).render("errorPage");

//   }

// })


//admin profile
route.get("/admin/adminProfile",async(req,res)=>{
  try{
      const admin_profile  = await admin.findOne({_id:req.cookies.id});

      return   res.render("adminProfile",{
          admin:admin_profile,

      })

  }
  catch(err)
  {
              return res.status(400).render("errorPage");

  }
});


//update admin profile
route.post("/admin/update_admin_profile",upload.single("admin_image"),async(req,res)=>{
  try{
      const adminId = req.cookies.id;
      admin_new_image = "";
      const admin_profile  = await admin.findOne({_id:req.cookies.id});

     
      const updatedAdmin = await  admin.findByIdAndUpdate({_id:adminId},{
          $set:{
              name:req.body.name,
              email:req.body.email,
              number:req.body.number,
              company:req.body.company,
              image:req.file.filename
          }
      }).then(()=>{
        

          return    res.render("adminProfile",{
              updateSuccess:"Admin succesfully updated"
          })
      })

  }
  catch(err)
  {
              return res.status(400).render("errorPage");

  }
})


//update admin password
route.post("/admin/updateAdminPassword",async(req,res)=>{
  try{
      const adminEmail = req.body.passswordEmail;
      const  adminPassword = req.body.Cpassword;
      const adminPasswordUpdteId = req.cookies.id;
      const adminUpdatePassword = await admin.findByIdAndUpdate({_id:adminPasswordUpdteId},{
          $set:{
              password:adminPassword,
          }
      }).then(()=>{
          return     res.redirect("/admin/adminProfile")
      })
      

  }
  catch(err)
  {
              return res.status(400).render("errorPage");

  }
});

//admin logout route
route.get("/adminLogout", (req, res) => {
  try {
      req.session.destroy();
      res.clearCookie("product_id");
      res.clearCookie("connection.sid");
      res.clearCookie("user_sid");
     
      res.clearCookie("id")
      res.redirect("/admin/adminLogin")
  }
  catch (err) {
      return res.status(400).render("errorPage");

  }
})













module.exports = route;
