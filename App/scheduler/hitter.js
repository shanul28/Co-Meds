const vaccineSlot = require("C:/Users/Shanul/Desktop/Co-Med/App/api/vaccineSlot");


//function to hit api call every 2second.
var hitSlot = vaccineSlot.hittingApi = () => {
    var myApiCall = setInterval(apiCall, 6000);
    return myApiCall;
}
module.exports = {
    hitSlot,
};