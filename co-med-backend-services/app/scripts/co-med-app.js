const config = require("config");
const VaccineSlotScheduler = require("./scheduler/vaccine-slot-scheduler")


class CoMedApp {

      constructor(){
        const vaccineSlotScheduler = new VaccineSlotScheduler();
        vaccineSlotScheduler.schedule();
      }
}   
//exporting CMedApp class
module.exports =  CoMedApp