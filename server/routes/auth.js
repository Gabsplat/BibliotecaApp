var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
var db = require("../test_db");

var router = express.Router();

// Login verification
passport.use(
  new LocalStrategy(function verify(correo, password, cb) {
    db.query(
      "SELECT * FROM usuario WHERE correo = ?",
      [correo],
      function (err, results) {
        row = results[0];
        if (err) {
          return cb(err);
        }
        if (!row) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        crypto.pbkdf2(
          password,
          row.salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (err) {
              return cb(err);
            }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            }
            return cb(null, row);
          }
        );
      }
    );
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log(user);
    cb(null, {
      id: user.usuario_id,
      nombre: user.nombre,
      correo: user.correo,
      fechaCreacion: user.fecha_creacion,
      tipoUsuario: user.tipo_usuario,
      legajo: user.legajo,
      carrera: user.carrera,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.post("/signup", function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      db.query(
        "INSERT INTO usuario (correo, hashed_password, salt) VALUES (?, ?, ?)",
        [req.body.correo, hashedPassword, salt],
        function (err) {
          if (err) {
            return next(err);
          }
          var user = {
            id: this.lastID,
            correo: req.body.correo,
          };
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
        }
      );
    }
  );
});

router.post("/test", function (req, res, next) {
  console.log("?");
  res.send("?");
});

router.post(
  "/login/password",
  passport.authenticate("local"),
  function (req, res) {
    res.send(req.user);
  }
);

router.post("/logout", function (req, res, next) {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
    res.json({ message: "logged out" });
  });
});

router.get("/user", function (req, res) {
  res.send(req.user);
});

router.get("/protectedLink", function (req, res) {
  if (!req.user) {
    res.status(401).send("Unauthorized");
  } else {
    res.json({ message: "You are authorized" });
  }
});

module.exports = router;
