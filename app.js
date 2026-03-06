const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.use("/",authRoutes);
app.use("/todos",todoRoutes);

app.listen(process.env.PORT,()=>{
 console.log("Server running on port "+process.env.PORT);
});