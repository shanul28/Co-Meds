const express = require("express")
const https = require("https")


// function which make https Get request to Cowin server.
todayDate = () => {
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth()+1;
  var year = d.getFullYear();

  var today = day + "-" + month + "-" + year;
  return today;
}


  apiCall = () => {
    console.log(todayDate());
    const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=696&date="+todayDate()+""
  
    var chunks = [];
    https.get(url, function (response) {
   
      console.log(response.statusCode)

      if (response.statusCode === 200) {
        response.on('data', function (data) {
          chunks.push(data);
        }).on('end', function () {
          var data = Buffer.concat(chunks);
          let schema = JSON.parse(data);
        
          var centersLength = schema.centers.length;
   
          var ageLimit = schema.centers[centersLength - 1].sessions[0].min_age_limit;
          var session_id = schema.centers[centersLength - 1].sessions[0].sessions_id;
          var totalVaccineAvailibity = schema.centers[centersLength - 1].sessions[0].available_capacity;
          var date = schema.centers[centersLength - 1].sessions[0].date;
          var name = schema.centers[centersLength - 1].name;

          return console.log(schema);
          // return console.log("\n total centers: " + centersLength + "\n Hospital Name: " + name + "\n Session Id: " +
          //   session_id + "\n Min age: " + ageLimit + "\n Total Vaccine: " + totalVaccineAvailibity + "\n Date :" + +date);
        

        });

      } else if (response.statusCode === 404) {
        console.log("Not found Error 404");
      } else if (response.statusCode === 400) {
        console.log("Bad request Error 400, Invalid syntax")
      }

    })

  }



module.exports = {
  apiCall,
};
