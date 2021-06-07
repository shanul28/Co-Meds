const VaccineSlotScheduler = require("./scheduler/vaccine-slot-scheduler");
// const VaccineDbDisc = require("./vaccine-slot-DB/vaccine-db");
// const flatData = require("./vaccine-slot-DB/flat-data-db");
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