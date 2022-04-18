var express = require('express');
const app = express();
const PORT = 8000;
var bodyParser = require('body-parser');
var fs = require('fs');
const { json } = require('express/lib/response');

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
/////P//R//O//P//E//R//T//Y/////
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






//////L//O//G//I//N///////
app.get('/user/login/:Email', function (req, res) {
  var { Emails } = req.params;
  var EmailAddress;

  for (var i = 0, l = obj.user.length; i < l; i++) {
    var myobj = obj.user[i].E_mail;
    var NewRole = obj.user[i].Role;
    if(Emails == myobj){
      EmailAddress = {
        E_mail:req.params.Email,
        Role:obj.user[i].Role,
      }
    }
  }

  if (NewRole === "Owner"){
    res.send("Wellcome " + JSON.stringify(EmailAddress) + " You have successful Login. " + " To Delete a Property go to http://localhost:8000/Properties/delete/:Address." +
     " To delete a WorkSpace go to http://localhost:8000/WorkSpace/delete/:WorkSpace. " +
     " To Modify A Property go to http://localhost:8000/Modify/Property/:Address. " +
     " To Modify A WorkSpace go to http://localhost:8000/Modify/WorkSpace/:WorkSpace.");   
  }
  else if (NewRole === "CoWorker"){
    res.send("Wellcome " + JSON.stringify(EmailAddress) + " You have successful Login " + "You Can Search For Propertys by going to http://localhost:8000/Properties/'Peremeter'/'Peremeter Value'" + 
    " You Can Search for WorkSpaces by going to http://localhost:8000/WorkSpace/'Peremeter'/'Peremeter Value'" +
    " You Can Search for a Owners Details by going to http://localhost:8000/user/find/:name");
  }
  else {
    res.send("No Account found!");
  }

});
/////////////////////////
/////////////////////////






///M//O//D//I//F//Y//I//N//G///
////////////////////////////////
//This is the Modifying Propertys
app.put('Modify/Property/:Address', function (req, res){

//Make a search function
//find that value
//declare that value
//update that value




  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Address;
    if(Address == myobj){
      reply={
        Address:req.params.Address,
        Neighborhood:obj2.Prop[i].Neighborhood,
        Squarefeet:obj2.Prop[i].Squarefeet,
        Parking_Garage:obj2.Prop[i].Parking_Garage,
        Public_Transport:obj2.Prop[i].Public_Transport,
      }
    }
  }
  
  
  res.sendFile( __dirname + "/" + "Property.html" );


  








  
  const { Address } = req.params;
  const { Neighborhood, Squarefeet, Parking_Garage, Public_Transport } = req.body

  const Prop = Props.find((Prop) => Prop.Address === Address);

  if(Neighborhood){
    Prop.Neighborhood = Neighborhood;
  }
  if(Squarefeet){
    Prop.Squarefeet = Squarefeet;
  }
  if(Parking_Garage){
    Prop.Parking_Garage = Parking_Garage;
  }
  if(Public_Transport){
    Prop.Public_Transport = Public_Transport;
  }
});



//This is the Modifying WorkSpace
app.patch('/Modify/WorkSpace/:WorkSpace', function (req, res) {
  res.sendFile( __dirname + "/" + "WorkSpace.html" );
  const { WorkSpace } = req.params;
  const { Max_Individuals, Smoking, Avalible_Date, Lease_Term, Price } = req.body

  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].WorkSpace;
    if(WorkSpace == myobj){
      reply={
        WorkSpace:req.params.WorkSpace,
        Max_Individuals:obj3.Work[i].WorkSpace,
        Smoking:obj3.Work[i].Smoking,
        Avalible_Date:obj3.Work[i].Avalible_Date,
        Lease_Term:obj3.Work[i].Lease_Term,
        Price:obj3.Work[i].Price,
      }
    }
  }

  if(Max_Individuals){
    Work.Max_Individuals = Max_Individuals;
  }
  if(Smoking){
    Work.Smoking = Smoking;
  }
  if(Avalible_Date){
    Work.Avalible_Date = Avalible_Date;
  }
  if(Lease_Term){
    Work.Lease_Term = Lease_Term;
  }
  if(Price){
    Work.Price = Price;
  }
});
////////////////////////////////
////////////////////////////////




//D//E///L//E//T/E//I//I//N//G//
//This is for deleteing Properties
app.delete('/Properties/delete/:Address', (req, res) => {
  const { Address } = req.params;
  //Removes the Property that finds its Address legth 
  for (var i = 0, l = obj2.Prop.length; i < l; i++) {
    var myobj = obj2.Prop[i].Address;
    if(Address == myobj){
      reply={
        Address:req.params.Address,
        Neighborhood:obj2.Prop[i].Neighborhood,
        Squarefeet:obj2.Prop[i].Squarefeet,
        Parking_Garage:obj2.Prop[i].Parking_Garage,
        Public_Transport:obj2.Prop[i].Public_Transport,
      }
    }
  }
  res.send(JSON.stringify(reply) + "Is now Deleted");
});

//For Deleteing WorkSpaces
app.delete('/WorkSpace/delete/:WorkSpace', (req, res) => {
  const { WorkSpace } = req.params;
  //Removes the WorkSpace that finds its Name legth
  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].WorkSpace;
    if(WorkSpace == myobj){
      reply={
        WorkSpace:req.params.WorkSpace,
        Max_Individuals:obj3.Work[i].WorkSpace,
        Smoking:obj3.Work[i].Smoking,
        Avalible_Date:obj3.Work[i].Avalible_Date,
        Lease_Term:obj3.Work[i].Lease_Term,
        Price:obj3.Work[i].Price,
      }
    }
  }
  res.send(json.stringify(reply) + "Is now deleted")
});
///////////////////////////////


///////////////////////////////
//OWNER ENDS HERE
///////////////////////////////
//Co-Worker Begins
//////////////////////////////


//S//E//A//R//C//H//I//N//G//
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
        Address:obj2.Prop[i].Address,
        Neighborhood:obj2.Prop[i].Neighborhood,
        Squarefeet:obj2.Prop[i].Squarefeet,
        Parking_Garage:obj2.Prop[i].Parking_Garage,
      }
    }
  }
  res.send(JSON.stringify(reply));
});

//This is number of individuals it can seat
app.get('/users/Properties/WorkSpace/MaxIndividuals/:Max_Individuals', function (req, res) {
  const { Max_Individuals } = req.params;
  var reply;

  for (var i = 0, l = obj3.Work.length; i < l; i++) {
    var myobj = obj3.Work[i].Max_Individuals;
    if(Max_Individuals == myobj){
      reply={
        Max_Individuals:req.params.Max_Individuals,
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
    var myobj = obj.user[i].first_name;
    if(name == myobj){
      reply={
        first_name:req.params.name,
        phone_number:obj.user[i].phone_number,
        E_mail:obj.user[i].E_mail,
        Role:obj.user[i].Role,
      }
    }
  }
  res.send(JSON.stringify(reply));
});
////////////////////////////////









  //Listens to the port(8000)
  app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));