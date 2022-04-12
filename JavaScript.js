//I used nodemon to install for updates to install use this (node i -g nodemon)
//to run you now use nodemon insted of node
/*
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

app.get('/', function (req, res) { // Posts Owner information on properties
  res.send();
});

app.get('/', function (req, res) { // Updates and adds Information to properties in Ownerproperties webpage
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
    }
  }






  //EXAMPLE OF DELETE
  app.delete('/', (req, res) => {
    //Finding informaion
    const ;
    if (!course) {
      res.status(404).send('Could not be found')
      return;
    }

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return Response
    res.send(course);
  });


*/



///////////////////////////////////////////////////////////////////////////


var express = require('express');
const app = express();
const PORT = 8000;
var bodyParser = require('body-parser');
var fs = require('fs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var Savedata = fs.existsSync('Registration.json')
    if(Savedata){
        console.log('Finding Users File');
        var SaveDatad = fs.readFileSync('Registration.json');
        obj = JSON.parse(SaveDatad);
    }
    else{
        console.log("Couldnt find File. Creating One");
        var obj = {user:[]}
    }

  //This is the home page of http://localhost:8000
    app.get('/', (req, res) => {
      res.send(`Create a user at http://localhost:${PORT}/user.
      Create a Propertie at http://localhost:${PORT}/Properties.
      Add more to Propertie at http://localhost:${PORT}/"Whatever your propertie Address is."`);
  })

  //This is the user page linked to the index.html document http://localhost:8000/user
  app.get('/user', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
    });

  //This is the Owner Properties Creation
  app.get('/Properties', function (req, res) {
    res.sendFile( __dirname + "/" + "Owner.html" );
    });
  
  //This is the Properties Workspace for rent
  app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "OwnerProperties.html" );
    });


//////////////////////
    //Gets the click event for /user. Cickevent = "urlencodedParser". 
  app.post('/userCreated', urlencodedParser, SavingUser);

  //Pushes the answers to the User.json
  function SavingUser(req, res) {
    obj.user.push ({
      firstName:req.body.first_name,
      phoneNumber:req.body.phone_number,
      eMail:req.body.E_mail,
      Role:req.body.Role,
    });
    let NowSaved = JSON.stringify(obj, null, 2);
    fs.writeFile('User.json', NowSaved, (err) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log('Loading User Page Done');
      }
    }
  )};
/////////////////////////

/////////////////////////
  //This is the clickevent for /Properties
  app.post('/PropertiesCreated', urlencodedParser, SavingPropertie);

  function SavingPropertie(req, res) {
    obj.user.push ({
      Address:req.body.Address,
      Neighborhood:req.body.Neighborhood,
      Squarefeet:req.body.Squarefeet,
      ParkingGarage:req.body.Parking_Garage,
      PublicTransport:req.body.Public_Transport,
    });
    let good = JSON.stringify(obj, null, 2);
    fs.writeFile('User.json', good, (err) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log('Loading Owner Page Done');
      }
    }
  )};
/////////////////////////







  //Listens to the port(8000)
  app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));