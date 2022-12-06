const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const clientSessions = require("client-sessions");

const HTTP_PORT = process.env.PORT || 8000;

///2222
// Register handlerbars as the rendering engine for views
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
// Setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static("static"));

// Setup client-sessions
app.use(
  clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "week10example", // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60, // the session will be extended by this many ms each request (1 minute)
  })
);
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
///3333333333333
// call this function after the http server starts listening for requests

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
// A simple user object, hardcoded for this example
const user = {
  username: "sampleuser",
  password: "samplepassword",
  email: "sampleuser@example.com",
};
// Setup a route on the 'root' of the url to redirect to /loginn
app.get("/", (req, res) => {
  res.redirect("/loginn");
});
// Display the loginn html page
app.get("/loginn", function (req, res) {
  res.render("loginn", { layout: false });
});
// The loginn route that adds the user to the session
app.post("/loginn", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    // Render 'missing credentials'
    return res.render("loginn", {
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
    res.redirect("/dashboard");
    app.use('/api/restaurants', require('./routes2/restaurantRoutes'));

  } else {
    // render 'invalid username or password'
    res.render("loginn", {
      errorMsg: "invalid username or password!",
      layout: false,
    });
  }
});
// Log a user out by destroying their session
// and redirecting them to /loginn
app.get("/logout", function (req, res) {
  req.session.reset();
  res.redirect("/loginn");
});
app.listen(HTTP_PORT, onHttpStart);

//44444444
// An authenticated route that requires the user to be logged in.

// Notice the middleware 'ensureloginn' that comes before the function

// that renders the dashboard page

app.get("/dashboard", ensureLogin, (req, res) => {
  res.render("dashboard", { user: req.session.user, layout: false });
});

app.use('/api/restaurants', require('./routes2/restaurantRoutes'));

app.use('/api/restaurants', ensureLogin, (req, res) => {
  res.render("insert", { user: req.session.user, layout: false });
});
app.use('/new', require('./routes2/userRoutes'));
app.use('/api/restaurants', require('./routes2/restaurantRoutes'));

// This is a helper middleware function that checks if a user is logged in

// we can use it in any route that we want to protect against unauthenticated access.

// A more advanced version of this would include checks for authorization as well after

// checking if the user is authenticated

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/loginn");
  } else {
    next();
  }
}
