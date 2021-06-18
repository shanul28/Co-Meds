const VaccineSlotScheduler = require("./scheduler/vaccine-slot-scheduler");
const PurgeDataScheduler = require("./scheduler/purge-data-scheduler");

class CoMedApp {
  /**
  * VaccineSlotScheduler() set time interval
  * after which  vaccines data is required
  * and executes the task by calling 
  * VaccineSlotService class
  */
  constructor() {
    const vaccineSlotScheduler = new VaccineSlotScheduler();
    vaccineSlotScheduler.schedule();
    const purgeDataScheduler = new PurgeDataScheduler();
    purgeDataScheduler.schedule();
  }
}

//exporting CMedApp class
module.exports = CoMedApp