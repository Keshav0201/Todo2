const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.get("/",(req,res)=>{
 res.render("landing");
});

router.get("/login",(req,res)=>{
 res.render("login");
});

router.get("/signup",(req,res)=>{
 res.render("signup");
});

router.post("/signup",auth.signup);

router.post("/login",auth.login);

router.get("/logout",(req,res)=>{

 res.clearCookie("token");

 res.redirect("/");

});

module.exports = router;