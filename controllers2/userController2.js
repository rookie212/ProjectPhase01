const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const clientSessions = require("client-sessions");

app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use(express.static("static"));

app.use(
  clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "week10example", // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60, // the session will be extended by this many ms each request (1 minute)
  })
);
app.use(express.urlencoded({ extended: false }));
const user = {
  username: "sampleuser",
  password: "samplepassword",
  email: "sampleuser@example.com",
};

var db = require('./config2/db2');

db.initialize();
var User = require('./models2/user');


app.get("/", (req, res) => {
  res.redirect("/loginn");
});
app.get("/loginn", function (req, res) {
  res.render("loginn", { layout: false });
});
app.post("/loginn", (req, res) => {
    User.findOne({username: })

    
  const username = req.body.username;
  const password = req.body.password;


  if (username === "" || password === "") {
    return res.render("login", {
      errorMsg: "Missing credentials.",
      layout: false,
    });
  }
  // use sample "user" (declared above)
  if (username === user.username && password === user.password) {
    // Add the user on the session and redirect them to the dashboard page.
    req.session.user = {
      username: user.username,
      email: user.email,
    };
    // res.redirect("/dashboard");
    res.redirect('/api/restaurants', require('./routes2/restaurantRoutes'));
    
  } else {
    // render 'invalid username or password'
    res.render("login", {
      errorMsg: "invalid username or password!",
      layout: false,
    });
  }
});
// Log a user out by destroying their session
// and redirecting them to /login
app.get("/logout", function (req, res) {
  req.session.reset();
  res.redirect("/login");
});
app.listen(HTTP_PORT, onHttpStart);

//44444444
// An authenticated route that requires the user to be logged in.

// Notice the middleware 'ensureLogin' that comes before the function

// that renders the dashboard page

app.get("/dashboard", ensureLogin, (req, res) => {
  res.render("dashboard", { user: req.session.user, layout: false });
});

app.get("/goto", ensureLogin, (req, res) => {
  res.render("goto", { user: req.session.user, layout: false });
});

// This is a helper middleware function that checks if a user is logged in

// we can use it in any route that we want to protect against unauthenticated access.

// A more advanced version of this would include checks for authorization as well after

// checking if the user is authenticated

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}
