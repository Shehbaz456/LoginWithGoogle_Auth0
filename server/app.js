require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
require("./DB/connectDB");
const PORT = process.env.PORT || 8000;
const session = require("express-session");
const passport = require("passport");
const UserDB = require("./model/userSchema");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

// http://localhost:8000/auth/google
// http://localhost:8000/auth/google/callback

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET POST PATCH HEAD PUT DELETE",
    credentials: true,
  })
);
app.use(express.json());

// setup seccsion
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserDB.findOne({ googleId: profile.id });
        if (!user) {
          user = new UserDB({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google auth login

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.get("/login/success", async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173");
  });
});

app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});
