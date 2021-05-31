const config = require("config");
const VaccineSlotService = require("../service/vaccine-slot-service");
const VaccineSlotParser = require("../utils/vaccine-slot-parser");

const districtCode = config.get('http.parameters.district_code');
const time = config.get("scheduler.time_interval_in_ms");

class VaccineSlotScheduler {

      constructor() {}
     /** 
     * The schedule() method retrieves data 
     * by calling executeTask() at given 
     * time intreval.
     */
    schedule() {
        setInterval(this.executeTask , time);
    }
     /**  
     *  The executeTask() method fetches slots
     *  of given district code and date and parse
     *  that data into a flat list if 
     *  response code is 200   
     */
    executeTask() {
        const vaccineSlotService = new VaccineSlotService();
        const slotPromise = vaccineSlotService.fetchSlots(districtCode, new Date());

        slotPromise.then( schemaJson => {
            // parse slots data and make a flat list.
            const flatSlots = VaccineSlotParser.parse(schemaJson);

            // upsert flatSlots into mongo db.
        } ).catch( responseStatus => {
            //catch method runs when response code isn't 200.
            console.error("Vaccine Slot API failed with status " + responseStatus);
        });
        
        
    }


}
//exporting VaccineSlotScheduler class.
module.exports = VaccineSlotScheduler