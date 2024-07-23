const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const cors = require("cors");

require('dotenv').config();

mongoose.connect("mongodb+srv://"+process.env.MYDBUSER+":"+process.env.MYDBPASS+"@myatlasclusteredu.3ebfqvk.mongodb.net/blogsiteDB");

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(session({
    secret: "keyboardcatmouse",
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/api/current_user', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ user: null });
    }
});
  

app.get("/logout", function(req, res) {
    req.logout();
    res.status(200).json({ message: "Logout successful" });
    res.redirect("/")
  });
  ;
  
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user });
  });
  
  app.post('/register', (req, res) => {
    User.register(new User({ name: req.body.name, username: req.body.username }), req.body.password, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        passport.authenticate('local')(req, res, () => {
          res.json({ user });
        });
      }
    });
  });
  
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));
 
app.listen(8000, function () {
    console.log("Server is live");
});
