require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");

var authRouter = require("./routes/auth");
var bibliotecaRouter = require("./routes/biblioteca");
var utilsRouter = require("./routes/utils");

const MySQLStore = require("express-mysql-session")(session);

var app = express();

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "biblioteca",
};

app.locals.pluralize = require("pluralize");

const sessionStore = new MySQLStore(options);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(passport.authenticate("session"));

app.use("/", authRouter);
app.use("/", utilsRouter);
app.use("/biblioteca", bibliotecaRouter);

app.get("/", function (req, res, next) {
  res.json({ message: "Hello, World!" });
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
