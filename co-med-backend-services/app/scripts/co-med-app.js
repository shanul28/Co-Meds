const VaccineSlotScheduler = require("./scheduler/vaccine-slot-scheduler");

class CoMedApp {

      constructor(){
        const vaccineSlotScheduler = new VaccineSlotScheduler();
        vaccineSlotScheduler.schedule();
      }
}   

module.exports =  CoMedApp