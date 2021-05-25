const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express();
require('dotenv').config();

// require('bootstrap');
app.use(express.static("public"));
app.set('view engine', 'ejs');


var Slots = [];

app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req, res) {
  var pincode = req.body.pin;
  var dates = req.body.date;
  const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + dates + "";
  // res.render("slot-details", {vaccineSlot: Slots} );
  const request = https.get(url, function(response) {
    response.on("data", function(data) {

      console.log(JSON.parse(data));
      const vaccineData = JSON.parse(data);
      for (var i = 0; i < (response._eventsCount) + 1; i++) {
        var vaccineHospital = vaccineData.sessions[i].name;
        Slots.push(vaccineHospital);
        console.log(Slots[i]);
        res.write(vaccineHospital + " ");
      }
      res.send();
      //  res.redirect("/slot-details.html")
      // res.send();
      // console.log(vaccineHospital+"  ");
      console.log(response._eventsCount);
      // res.send(slotName);

    })

  })
  // const name = request.response.on(data.name;
  // res.write(name);
  // res.write("good");
  // res.send();
});
//
// app.post("/", function(req, res) {
//   response.on("data", function(data) {
//     var covid = JSON.parse(data);
//     res.send("check terminal");
//   })
//
// })
app.listen(8000, function(res) {
  console.log("server running at port 8000")
})
