const VaccineSlotScheduler = require("./scheduler/vaccine-slot-scheduler")

class CoMedApp {
         /**
         * VaccineSlotScheduler() set time interval
         * after which  vaccines data is required
         * and executes the task by calling 
         * VaccineSlotService class
         */
       constructor(){
          const vaccineSlotScheduler = new VaccineSlotScheduler();
          vaccineSlotScheduler.schedule();
      }
}   

//exporting CMedApp class
module.exports =  CoMedApp