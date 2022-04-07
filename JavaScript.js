import express from 'express';
var app = express();

var UserFileExists = fs.existsSync('User.json');
if (UserFileExists) {
  console.log('loading'); //So we know its loading
  var PersonalData = fs.readFileSync('User.json', 'utf8'); // Makes the data be imported
  obj= JSON.parse(PersonalData); // Converts string to object
} 
else {
  console.log('Created new object') //lets you know object has been created
  var obj= {user:[]}; //If no object then makes one
}



// start the server in the port 3001 !
var callback = function () {
  
}
app.listen(4001, callback);



// on the request to root (localhost:3001/) Start up page when opening for first time
app.get('/', function (req, res) {
    res.send("Wellcome Please Procided to the next page to create a user");
});

// On localhost:3001/welcome
app.get('/User', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});

app.post('/user', urlencodedParser, Newuser);//Posts the user information

app.get('/', function (req, res) {
  res.send();
});

app.get('/', function (req, res) {
  res.send();
});

app.get('/', function (req, res) {
  res.send();
});

// On localhost:3001/login
app.get('/login', function (req, res) {
    res.send('<p>username<input type="text" /></p>  <p>Password: <input type="text" /> </p> <button>login</button>');
});




const app = express()
app.use(express.json())

exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Enter password" })
    }
    try {
      await User.create({
        username,
        password,
      }).then(user =>
        res.status(200).json({
          message: "User successfully created",
          user,
        })
      )
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      })
    }
  }

  const express = require("express")
const router = express.Router()
const { register } = require("./auth")
router.route("/register").post(register)
module.exports = router

exports.login = async (req, res, next) => {
    const { username, password } = req.body
    // Check if username and password is provided
    if (!username || !password) {
      return res.exports.login = async (req, res, next) => {
        try {
          const user = await User.findOne({ username, password })
          if (!user) {
            res.status(401).json({
              message: "Login not successful",
              error: "User not found",
            })
          } else {
            res.status(200).json({
              message: "Login successful",
              user,
            })
          }
        } catch (error) {
          res.status(400).json({
            message: "An error occurred",
            error: error.message,
          })
        }

      }