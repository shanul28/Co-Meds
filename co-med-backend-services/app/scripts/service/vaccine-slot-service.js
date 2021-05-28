const express = require("express")
const https = require("https")

class VaccineSlotService {
  constructor() {}


  // function which make https Get request to Cowin server.
  getFormattedDate = (d) => {
    if(!d) {
      throw new Error('Vaccine fetch date is empty');
    }

    const day = d.getDate(),
          month = d.getMonth() + 1,
          year = d.getFullYear(),
          today = day + "-" + month + "-" + year;
    
          return today;
  }


  fetchSlots = (districtCode , date) => {
    const formattedDate = this.getFormattedDate(date);

    const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + districtCode + "&date=" + formattedDate;

    var promise = new Promise((resolve, reject) => {
      https.get(url, function (response) {
        console.log(response.statusCode)
        if (response.statusCode === 200) {
          let chunks = [];
          response.on('data', function (data) {
            chunks.push(data);
          }).on('end', function () {
            const data = Buffer.concat(chunks);
            const schemaData = JSON.parse(data);
            resolve(schemaData);
          });
        } else {
          reject(response.statusCode);
        }
      });
    });

    return promise;
  }
}


module.exports = VaccineSlotService
