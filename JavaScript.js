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


*/



///////////////////////////////////////////////////////////////////////////


var express = require('express');
const app = express();
const PORT = 8000;
var bodyParser = require('body-parser');
var fs = require('fs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var Savedata = fs.existsSync('User.json')
    if(Savedata){
        console.log('Finding Users File');
        var SaveDatad = fs.readFileSync('User.json');
        obj = JSON.parse(SaveDatad);
        obj2 = JSON.parse(SaveDatad);
        obj3 = JSON.parse(SaveDatad);
    }
    else{
        console.log("Couldnt find File. Creating One");
        var obj = {user:[]}
    }

var obj2 = {Prop:[]};
var compObj = {user:[obj2]};


var obj3 = {Work:[]};
var compObj2= {user:[obj2[obj3]]};







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


  //This is the Properties Creation
  app.get('/user/Properties', function (req, res) {
    res.sendFile( __dirname + "/" + "Property.html" );
    });
/////////////////////////
  //This is the clickevent for /Properties
  app.post('/PropertiesCreated', urlencodedParser, SavingPropertie);

  //obj.user.properties.push I am trying to push a new object inside of an existing object
  function SavingPropertie(req, res) {
    obj2.Prop.push ({
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


 //This is the Workspace for rent
 app.get('/user/Properties/Workspace', function (req, res) {
  res.sendFile( __dirname + "/" + "WorkSpace.html" );
  });
/////////////////////////
app.post('/WorkspaceCreated', urlencodedParser, SaviningWorkSpace);

function SaviningWorkSpace(req, res) {
obj3.Work.push ({
  WorkSpace:req.body.WorkSpace,
  Max_Individuals:req.body.Max_Individuals,
  Smoking:req.body.Smoking,
  Avalible_Date:req.body.Avalible_Date,
  Lease_Term:req.body.Lease_Term,
  Price:req.body.Price,
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
/////////////////////////





////////////////////////


//This is for finding users
app.get('/user/:first_name', function (req, res) {
  const { first_name } = req.params;

  const foundUser = users.find((user) => user.first_name === first_name);

  //This just sends the users information back to the webpage
  res.send(foundUser);
});


//////////////////////////
//This is the Modifying Webpage
app.get('/:Properties/:WorkSpace', function (req, res) {
  const { Address } = req.params;
  const { WorkSpace } = req.params;

  const foundProperties = Properties.find((Prop) => Prop.Address === Address);
  const foundWorkSpace = WorkSpaces.find((Work) => Work.WorkSpace === WorkSpace);

  res.sendFile( __dirname + "/" + "Modify.html" );




  });
/////////////////////////





////////////////////////
//This is for deleteing Properties
app.delete('/users/:Address', (req, res) => {
  const { Address } = req.params;
  //Removes the user that finds its name false
  Properties = Properties.filter((Prop) => Prop.Address !== Address);
});


///////////////////////////
//OWNER ENDS HERE
//////////////////////////
//Co-Worker Begins


//This is for Searching up a place by each catigory
//////////////////////////
//This is Address search
app.get('/users/Properties/:Address', function (req, res) {
  const { Address } = req.params;
  const searchAddress = Add.find((Prop) => Prop.Address === Address);
  res.send(searchAddress);
});

//This is neighborhood
app.get('/users/Properties/:Neighborhood', function (req, res) {
  const { Neighborhood } = req.params;
  const searchNeighborhood = Neigh.find((Prop) => Prop.Neighborhood === Neighborhood);
  res.send(searchNeighborhood);
});

//This is square feet
app.get('/users/Properties/:Squarefeet', function (req, res) {
  const { Squarefeet } = req.params;
  const searchSquarefeet = Square.find((Prop) => Prop.Squarefeet === Squarefeet);
  res.send(searchSquarefeet);
});

//This is with/without parking
app.get('/users/Properties/:Parking_Garage', function (req, res) {
  const { Parking_Garage } = req.params;
  const searchParking_Garage = Parking.find((Prop) => Prop.Parking_Garage === Parking_Garage);
  res.send(searchParking_Garage);
});

//This is with/without public transportation
app.get('/users/Properties/:Public_Transport', function (req, res) {
  const { Public_Transport } = req.params;
  const searchPublic_Transport = Transport.find((Prop) => Prop.Public_Transport === Public_Transport);
  res.send(searchPublic_Transport);
});

//This is number of individuals it can seat
app.get('/users/Properties/WorkSpace/:Max_Individuals', function (req, res) {
  const { Max_Individuals } = req.params;
  const searchMax_Individuals = Max.find((Work) => Work.Max_Individuals === Max_Individuals);
  res.send(searchMax_Individuals);
});

//This is with/without smoking
app.get('/users/Properties/WorkSpace/:Smoking', function (req, res) {
  const { Smoking } = req.params;
  const searchSmoking = Smoke.find((Work) => Work.Smoking === Smoking);
  res.send(searchSmoking);
});

//This is availability date
app.get('/users/Properties/WorkSpace/:Avalible_Date', function (req, res) {
  const { Avalible_Date } = req.params;
  const searchAvalible_Date = Avalible.find((Work) => Work.Avalible_Date === Avalible_Date);
  res.send(searchAvalible_Date);
});

//This is lease term
app.get('/users/Properties/WorkSpace/:Lease_Term', function (req, res) {
  const { Lease_Term } = req.params;
  const searchLease_Term = Lease.find((Work) => Work.Lease_Term === Lease_Term);
  res.send(searchLease_Term);
});

//This is Price
app.get('/users/Properties/WorkSpace/:Price', function (req, res) {
  const { Price } = req.params;
  const searchPrice = Pri.find((Work) => Work.Price === Price);
  res.send(searchPrice);
});
///////////////////////////////////////



































  //Listens to the port(8000)
  app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));