const VaccineSlotScheduler = require("./scheduler/vaccine-slot-scheduler")

class CoMedApp {

      constructor(){
        /**
         * VaccineSlotScheduler() set time interval
         * after which  vaccines data is required
         * and executes the task by calling 
         * VaccineSlotService class
         */
        const vaccineSlotScheduler = new VaccineSlotScheduler();
        vaccineSlotScheduler.schedule();
      }
}   
//exporting CMedApp class
module.exports =  CoMedApp