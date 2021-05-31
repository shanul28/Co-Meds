const config = require("config")
const express = require("express")
const https = require("https")

class VaccineSlotService {
  constructor() {}

  /** *getFormattedDate() method formats the 
   * data into DD-MM-YYYY or D-M-YYYY.*/
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

  /** * fetchSlots() method make a https GET request 
   * to Cowin API setu server and collects whole 
   * schema data of vaccines and return a 
   * promise object. */
  fetchSlots = (districtCode , date) => {
    const formattedDate = this.getFormattedDate(date);
    const url = config.get("http.parameters.get_calendar_by_district_url")+"district_id="+districtCode+"&"+"date="+formattedDate;

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

// exporting VaccineSlotService class.
module.exports = VaccineSlotService
