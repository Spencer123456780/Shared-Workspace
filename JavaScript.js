var express = require('express');
const app = express();
const PORT = 8000;
var bodyParser = require('body-parser');
var fs = require('fs');
const { json, get } = require('express/lib/response');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var urlencodedParser2 = bodyParser.urlencoded({ extended: false })
var urlencodedParser3 = bodyParser.urlencoded({ extended: false })
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
        var obj2 = {Prop:[]}
        var obj3 = {Work:[]}
    }




//////////W//E//L//C//O//M//E//////////
  //This is the home page of http://localhost:8000
    app.get('/', (req, res) => {
      res.sendFile( __dirname + "/" + "WellcomePage.html" );
  });
///////////////////////////////////////




//////O//B//J//E//C//T/////C//R//E//A//T//I//O//N////////
  //This is the user page linked to the index.html document http://localhost:8000/user
  app.get('/user', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
    });
////U//S//E//R////
    //Gets the click event for /user. Cickevent = "urlencodedParser". 
  app.post('/userCreated', urlencodedParser, SavingUser);

  //Pushes the answers to the User.json
  function SavingUser(req, res) {
    obj.user.push ({
      firstName:req.body.first_name,
      phoneNumber:req.body.phone_number,
      eMail:req.body.E_mail,
      password:req.body.password,
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
///////////////////////////////

  //This is the Properties Creation
  app.get('/Properties', function (req, res) {
    res.sendFile( __dirname + "/" + "Property.html" );
    });
/////P//R//O//P//E//R//T//Y//////
  //This is the clickevent for /Properties
  app.post('/PropertiesCreated', urlencodedParser2, SavingPropertie);

  //obj.user.properties.push I am trying to push a new object inside of an existing object
  function SavingPropertie(req, res) {
    obj2.Prop.push ({
      Address:req.body.Address,
      Neighborhood:req.body.Neighborhood,
      Squarefeet:req.body.Squarefeet,
      ParkingGarage:req.body.Parking_Garage,
      PublicTransport:req.body.Public_Transport,
    });
    let good = JSON.stringify(obj2, null, 2);
    fs.writeFile('User.json', good, (err) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log('Loading Properties Page Done');
      }
    }
  )};
//////////////////////////////

 //This is the Workspace for rent
 app.get('/Workspace', function (req, res) {
  res.sendFile( __dirname + "/" + "WorkSpace.html" );
  });
////W//O//R//K////S//P//A//C//E////
app.post('/WorkspaceCreated', urlencodedParser3, SaviningWorkSpace);

function SaviningWorkSpace(req, res) {
obj3.Work.push ({
  WorkSpace:req.body.WorkSpace,
  Max_Individuals:req.body.Max_Individuals,
  Smoking:req.body.Smoking,
  Avalible_Date:req.body.Avalible_Date,
  Lease_Term:req.body.Lease_Term,
  Price:req.body.Price,
});
let good = JSON.stringify(obj3, null, 2);
    fs.writeFile('User.json', good, (err) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log('Loading WorkSpace Page Done');
      }
    }
  )};
//////////////////////////////
//////////////////////////////





///////////L//O//G//I//N//////////////
app.get('/user/login/:mail', function  (req, res) {
  var mail = req.params.E_mail;
  var Login;

  for (var i = 0, l = obj.user.length; i < l; i++) {
    var myEmail = obj.user[i].E_mail;
    var myRole = obj.user[i].Role;
    if(mail == myEmail){
    Login = {
        E_mail:req.params.Email,
        Role:obj.user[i].Role,
      } 
      if (myRole === "Owner"){
        res.send("Wellcome " + JSON.stringify(Login) + " You have successful Login. " + "........" +
         "Create A Property at http://localhost:8000/Properties" + "........." +
         "Create A WorkSpace at http://localhost:8000/Workspace" + "..........." +
         " To Delete a Property go to http://localhost:8000/Properties/delete/'Peremeter'/'Peremeter Value'" + "........" +
         " To Delete a WorkSpace go to http://localhost:8000/WorkSpace/delete/'Peremeter'/'Peremeter Value'" + "........" +
         " To Modify A Property go to http://localhost:8000/Modify/WorkSpace. " + "........" +
         " To Modify A WorkSpace go to http://localhost:8000/Modify/Property.");   
      }
      else if (myRole === "CoWorker"){
        res.send("Wellcome " + JSON.stringify(Login) + " You have successful Login " + ".........." +
        "You Can Search For Propertys by going to http://localhost:8000/Properties/'Property Peremeter'/'Peremeter Value'" + "........." +
        " You Can Search for WorkSpaces by going to http://localhost:8000/WorkSpace/'WorkSpace Peremeter'/'Peremeter Value'" + "........." +
        " You Can Search for a Owners Details by going to http://localhost:8000/user/find/:name");
      }
      else {
      res.send("No Account found!");
      } 
    }  
  }
}); 
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////






///M//O//D//I//F//Y//I//N//G///
////////////////////////////////
//This is the Modifying Propertys
app.get('/Modify/Property', function (req, res){
  res.sendFile( __dirname + "/" + "Modify Property.html" );
});


app.patch('/Modifyed/Property', function Modify (req, res){
  var modAddress = document.getElementById('ModifyAddress').value;
  var modedAddress = document.getElementById('ModifyedAddress').value;

  var modNeighborhood = document.getElementById('ModifyNeighborhood').value;
  var modedNeighborhood = document.getElementById('ModifyedNeighborhood').value;

  var modSquarefeet = document.getElementById('ModifySquarefeet').value;
  var modedSquarefeet = document.getElementById('ModifyedSquarefeet').value;

  var modParking_Garage = document.getElementById('ModifyParking_Garage').value;
  var modedParking_Garage = document.getElementById('ModifyedParking_Garage').value;

  var modPublic_Transport = document.getElementById('ModifyPublic_Transport').value;
  var modedPublic_Transport = document.getElementById('ModifyedPublic_Transport').value;


  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var propUpAdd = obj2.Prop[i].Address; //Finding a object with the Address
    var propNeighbor = obj2.Prop[i].Neighborhood; //Finding a object with the Neighborhood
    var propSquare = obj2.Prop[i].Squarefeet; //Finding a object with the Squarefeet
    var propParking = obj2.Prop[i].Parking_Garage; //Finding a object with the Parking_Garage
    var propPublic = obj2.Prop[i].Public_Transport; //Finding a object with the Public_Transport


    if (propUpAdd == modAddress){ //Making sure that the Input is the same as the peremeter
      if(modedAddress){
        propUpAdd = modedAddress; //Makes the found Address the new address
      }
    }
    if (propNeighbor == modNeighborhood){ //Making sure that the Input is the same as the peremeter
      if(modedNeighborhood){
        propNeighbor = modedNeighborhood; //Makes the found Neighborhood the new Neighborhood
      }
    }
    if (propSquare == modSquarefeet){ //Making sure that the Input is the same as the peremeter
      if(modedSquarefeet){
        propSquare = modedSquarefeet; //Makes the found Squarefeet the new Squarefeet
      }
    }
    if (propParking == modParking_Garage){ //Making sure that the Input is the same as the peremeter
      if(modedParking_Garage){
        propParking = modedParking_Garage; //Makes the found Parking_Garage the new Parking_Garage
      }
    }  
    if (propPublic == modPublic_Transport){ //Making sure that the Input is the same as the peremeter
      if(modedPublic_Transport){
        propPublic = modedPublic_Transport; //Makes the found Public_Transport the new Public_Transport
      }
    }
  }
  res.send('Property has been updated');
});
//if(modedAddress){
 // propUpAdd.Address = modedAddress; //Makes the found Address the new address
//}

app.get('/Modify/WorkSpace', function (req, res){
  res.sendFile( __dirname + "/" + "Modify WorkSpace.html" );
});


app.patch('/Modifyed/WorkSpace', function (req, res){
  var modWorkSpace = document.getElementById('ModifyWorkSpace').value;
  var modedWorkSpace = document.getElementById('ModifyedWorkSpace').value;

  var modMax_Individuals = document.getElementById('ModifyMax_Individuals').value;
  var modedMax_Individuals = document.getElementById('ModifyedMax_Individuals').value;

  var modSmoking = document.getElementById('ModifySmoking').value;
  var modedSmoking = document.getElementById('ModifyedSmoking').value;

  var modAvalible_Date = document.getElementById('ModifyAvalible_Date').value;
  var modedAvalible_Date = document.getElementById('ModifyedAvalible_Date').value;

  var modLease_Term = document.getElementById('ModifyLease_Term').value;
  var modedLease_Term = document.getElementById('ModifyedLease_Term').value;

  var modPrice = document.getElementById('ModifyPrice').value;
  var modedPrice = document.getElementById('ModifyedPrice').value;


  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var workName = obj3.Work[i].WorkSpace; //Finding a object with the Address
    var workIndividual = obj3.Work[i].Max_Individuals;
    var workSmoke = obj3.Work[i].Smoking;
    var workAvalible = obj3.Work[i].Avalible_Date;
    var workLease = obj3.Work[i].Lease_Term;
    var workPrice = obj3.Work[i].Price;

    if (workName == modWorkSpace){ //Making sure that the Input is the same as the peremeter
      if(modedWorkSpace){
        workName = modedWorkSpace;//Making the object change
      }
    }
    if (workIndividual == modMax_Individuals){ //Making sure that the Input is the same as the peremeter
      if(modedMax_Individuals){
        workIndividual = modedMax_Individuals;//Making the object change
      }
    }
    if (workSmoke == modSmoking){ //Making sure that the Input is the same as the peremeter
      if(modedSmoking){
        workSmoke = modedSmoking;//Making the object change
      }
    }
    if (workAvalible == modAvalible_Date){ //Making sure that the Input is the same as the peremeter
      if(modedAvalible_Date){
        workAvalible = modedAvalible_Date;//Making the object change
      }
    }
    if (workLease == modLease_Term){ //Making sure that the Input is the same as the peremeter
      if(modedLease_Term){
        workLease = modedLease_Term;//Making the object change
      }
    }
    if (workPrice == modPrice){ //Making sure that the Input is the same as the peremeter
      if(modedPrice){
        workPrice = modedPrice; //Making the object change
      }
    }
  }
  res.send('WorkSpace has been updated');
});


////////////////////////////////
////////////////////////////////






//D//E///L//E//T/E//I//I//N//G//
//This is for deleteing Properties
app.delete('/Properties/delete/Address/:Address', (req, res) => {
  const { Address } = req.params;
  //Removes the Property that finds its Address legth 
  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Address;
    if(Address == myobj){
      reply={
        Address:req.params.Address,
      }
    }
  }
  myobj === "";
  res.send(JSON.stringify(reply) + "Is now Deleted");
});

app.delete('/Properties/delete/Neighborhood/:Neighborhood', (req, res) => {
  const { Neighborhood } = req.params;
  //Removes the Property that finds its Address legth 
  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Neighborhood;
    if(Neighborhood == myobj){
      reply={
        Neighborhood:req.params.Neighborhood,
      }
    }
  }
  myobj === "";
  res.send(JSON.stringify(reply) + "Is now Deleted");
});

app.delete('/Properties/delete/Squarefeet/:Squarefeet', (req, res) => {
  const { Squarefeet } = req.params;
  //Removes the Property that finds its Address legth 
  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Squarefeet;
    if(Squarefeet == myobj){
      reply={
        Squarefeet:req.params.Squarefeet,
      }
    }
  }
  myobj === "";
  res.send(JSON.stringify(reply) + "Is now Deleted");
});

app.delete('/Properties/delete/Parking_Garage/:Parking_Garage', (req, res) => {
  const { Parking_Garage } = req.params;
  //Removes the Property that finds its Address legth 
  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Parking_Garage;
    if(Parking_Garage == myobj){
      reply={
        Parking_Garage:req.params.Parking_Garage,
      }
    }
  }
  myobj === "";
  res.send(JSON.stringify(reply) + "Is now Deleted");
});

app.delete('/Properties/delete/:Public_Transport', (req, res) => {
  const { Public_Transport } = req.params;
  //Removes the Property that finds its Address legth 
  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Public_Transport;
    if(Public_Transport == myobj){
      reply={
        Public_Transport:req.params.Public_Transport,
      }
    }
  }
  myobj === "";
  res.send(JSON.stringify(reply) + "Is now Deleted");
});


//For Deleteing WorkSpaces
app.delete('/WorkSpace/delete/WorkSpace/:WorkSpace', (req, res) => {
  const { WorkSpace } = req.params;
  //Removes the WorkSpace that finds its Name legth
  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].WorkSpace;
    if(WorkSpace == myobj){
      reply={
        WorkSpace:req.params.WorkSpace,
      }
    }
  }
  myobj === "";
  res.send(json.stringify(reply) + "Is now deleted")
});

app.delete('/WorkSpace/delete/Max_Individuals/:Max_Individuals', (req, res) => {
  const { Max_Individuals } = req.params;
  //Removes the WorkSpace that finds its Name legth
  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Max_Individuals;
    if(Max_Individuals == myobj){
      reply={
        Max_Individuals:req.params.Max_Individuals,
      }
    }
  }
  myobj === "";
  res.send(json.stringify(reply) + "Is now deleted")
});

app.delete('/WorkSpace/delete/Smoking/:Smoking', (req, res) => {
  const { Smoking } = req.params;
  //Removes the WorkSpace that finds its Name legth
  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Smoking;
    if(Smoking == myobj){
      reply={
        Smoking:req.params.Smoking,
      }
    }
  }
  myobj === "";
  res.send(json.stringify(reply) + "Is now deleted")
});

app.delete('/WorkSpace/delete/Avalible_Date/:Avalible_Date', (req, res) => {
  const { Avalible_Date } = req.params;
  //Removes the WorkSpace that finds its Name legth
  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Avalible_Date;
    if(Avalible_Date == myobj){
      reply={
        Avalible_Date:req.params.Avalible_Date,
      }
    }
  }
  myobj === "";
  res.send(json.stringify(reply) + "Is now deleted")
});

app.delete('/WorkSpace/delete/Lease_Term/:Lease_Term', (req, res) => {
  const { Lease_Term } = req.params;
  //Removes the WorkSpace that finds its Name legth
  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Lease_Term;
    if(Lease_Term == myobj){
      reply={
        Lease_Term:req.params.Lease_Term,
      }
    }
  }
  myobj === "";
  res.send(json.stringify(reply) + "Is now deleted")
});

app.delete('/WorkSpace/delete/Price/:Price', (req, res) => {
  const { Price } = req.params;
  //Removes the WorkSpace that finds its Name legth
  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Price;
    if(Price == myobj){
      reply={
        Price:req.params.Price,
      }
    }
  }
  myobj === ""; //Sets to a blank string
  res.send(json.stringify(reply) + "Is now deleted")
});
///////////////////////////////
///////////////////////////////

///////////////////////////////
//OWNER ENDS HERE
/////////////////////////////////
//Co-Worker Begins
/////////////////////////////////


////S//E//A//R//C//H//I//N//G////
//This is for Searching up a place by each catigory

//This is Address search
app.get('/Properties/Address/:Address', function (req, res) {
  const { Address } = req.params;
  var reply;

  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Address;
    if(Address == myobj){
      reply={
        Address:req.params.Address,
        Name:obj2.Prop[i].Name,
        Neighborhood:obj2.Prop[i].Neighborhood,
        Squarefeet:obj2.Prop[i].Squarefeet,
        Parking_Garage:obj2.Prop[i].Parking_Garage,
        Public_Transport:obj2.Prop[i].Public_Transport,
      }
    }
  }
  res.send(JSON.stringify(reply));
});

//This is neighborhood
app.get('/Properties/Neighborhood/:Neighborhood', function (req, res) {
  const { Neighborhood } = req.params;
  var reply;

  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Neighborhood;
    if(Neighborhood == myobj){
      reply={
        Neighborhood:req.params.Neighborhood,
        Name:obj2.Prop[i].Name,
        Address:obj2.Prop[i].Address,
        Squarefeet:obj2.Prop[i].Squarefeet,
        Parking_Garage:obj2.Prop[i].Parking_Garage,
        Public_Transport:obj2.Prop[i].Public_Transport,
      }
    }
  }
  res.send(JSON.stringify(reply));
});

//This is square feet
app.get('/Properties/Squarefeet/:Squarefeet', function (req, res) {
  const { Squarefeet } = req.params;
  var reply;

  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Squarefeet;
    if(Squarefeet == myobj){
      reply={
        Squarefeet:req.params.Squarefeet,
        Name:obj2.Prop[i].Name,
        Address:obj2.Prop[i].Address,
        Neighborhood:obj2.Prop[i].Neighborhood,
        Parking_Garage:obj2.Prop[i].Parking_Garage,
        Public_Transport:obj2.Prop[i].Public_Transport,
      }
    }
  }
  res.send(JSON.stringify(reply));
});

//This is with/without parking
app.get('/Properties/ParkingGarage/:Parking_Garage', function (req, res) {
  const { Parking_Garage } = req.params;
  var reply;

  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Parking_Garage;
    if(Parking_Garage == myobj){
      reply={
        Parking_Garage:req.params.Parking_Garage,
        Name:obj2.Prop[i].Name,
        Address:obj2.Prop[i].Address,
        Neighborhood:obj2.Prop[i].Neighborhood,
        Squarefeet:obj2.Prop[i].Squarefeet,
        Public_Transport:obj2.Prop[i].Public_Transport,
      }
    }
  }
  res.send(JSON.stringify(reply));
});

//This is with/without public transportation
app.get('/Properties/PublicTransport/Public_Transport', function (req, res) {
  const { Public_Transport } = req.params;
  var reply;

  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Public_Transport;
    if(Public_Transport == myobj){
      reply={
        Public_Transport:req.params.Public_Transport,
        Name:obj2.Prop[i].Name,
        Address:obj2.Prop[i].Address,
        Neighborhood:obj2.Prop[i].Neighborhood,
        Squarefeet:obj2.Prop[i].Squarefeet,
        Parking_Garage:obj2.Prop[i].Parking_Garage,
      }
    }
  }
  res.send(JSON.stringify(reply));
});



/////////////////////////////////

//This is number of individuals it can seat
app.get('/users/Properties/WorkSpace/MaxIndividuals/:Max_Individuals', function (req, res) {
  const { Max_Individuals } = req.params;
  var reply;

  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Max_Individuals;
    if(Max_Individuals == myobj){
      reply={
        Max_Individuals:req.params.Max_Individuals,
        Name:obj3.Work[i].Name,
        Address:obj3.Work[i].Address,
        WorkSpace:obj3.Work[i].WorkSpace,
        Smoking:obj3.Work[i].Smoking,
        Avalible_Date:obj3.Work[i].Avalible_Date,
        Lease_Term:obj3.Work[i].Lease_Term,
        Price:obj3.Work[i].Price,
      }
    }
  }
  res.send(JSON.stringify(reply));
});

//This is with/without smoking
app.get('/WorkSpace/Smoking/:Smoking', function (req, res) {
  const { Smoking } = req.params;
  var reply;

  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Smoking;
    if(Smoking == myobj){
      reply={
        Smoking:req.params.Smoking,
        Name:obj3.Work[i].Name,
        Address:obj3.Work[i].Address,
        WorkSpace:obj3.Work[i].WorkSpace,
        Max_Individuals:obj3.Work[i].Max_Individuals,
        Avalible_Date:obj3.Work[i].Avalible_Date,
        Lease_Term:obj3.Work[i].Lease_Term,
        Price:obj3.Work[i].Price,
      }
    }
  }  
  res.send(JSON.stringify(reply));
});

//This is availability date
app.get('/WorkSpace/AvalibleDate/:Avalible_Date', function (req, res) {
  const { Avalible_Date } = req.params;
  var reply;

  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Avalible_Date;
    if(Avalible_Date == myobj){
      reply={
        Avalible_Date:req.params.Avalible_Date,
        Name:obj3.Work[i].Name,
        Address:obj3.Work[i].Address,
        WorkSpace:obj3.Work[i].WorkSpace,
        Max_Individuals:obj3.Work[i].Max_Individuals,
        Smoking:obj3.Work[i].Smoking,
        Lease_Term:obj3.Work[i].Lease_Term,
        Price:obj3.Work[i].Price,
      }
    }
  }
  res.send(JSON.stringify(reply));
});

//This is lease term
app.get('/WorkSpace/LeaseTerm/:Lease_Term', function (req, res) {
  const { Lease_Term } = req.params;
  var reply;

  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Lease_Term;
    if(Lease_Term == myobj){
      reply={
        Lease_Term:req.params.Lease_Term,
        Name:obj3.Work[i].Name,
        Address:obj3.Work[i].Address,
        WorkSpace:obj3.Work[i].WorkSpace,
        Max_Individuals:obj3.Work[i].Max_Individuals,
        Smoking:obj3.Work[i].Smoking,
        Avalible_Date:obj3.Work[i].Avalible_Date,
        Price:obj3.Work[i].Price,
      }
    }
  }
  res.send(JSON.stringify(reply));
});

//This is Price
app.get('/WorkSpace/Price/:Price', function (req, res) {
  const { Price } = req.params;
  var reply;

  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Price;
    if(Price == myobj){
      reply={
        Price:req.params.Price,
        Name:obj3.Work[i].Name,
        Address:obj3.Work[i].Address,
        WorkSpace:obj3.Work[i].WorkSpace,
        Max_Individuals:obj3.Work[i].Max_Individuals,
        Smoking:obj3.Work[i].Smoking,
        Avalible_Date:obj3.Work[i].Avalible_Date,
        Lease_Term:obj3.Work[i].Lease_Term,
      }
    }
  }
  res.send(JSON.stringify(reply));
});
///////////////////////////////////////

//This is for finding users
app.get('/user/find/:name', function (req, res) {
  var { name } = req.params;
  var reply;

  for (var i = 0, l = obj.user.length; i < l; i++) {
    var myobj = obj.user[i].firstName;
    if(name == myobj){
      reply={
        firstName:req.params.name,
        phone_number:obj.user[i].phoneNumber,
        E_mail:obj.user[i].eMail,
        Role:obj.user[i].Role,
      }
    }
  }
  res.send(JSON.stringify(reply));
});
////////////////////////////////






  //Listens to the port(8000)
  app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));