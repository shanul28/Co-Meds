const VaccineSlotService = require("../service/vaccine-slot-service");
const VaccineSlotParser = require("../utils/vaccine-slot-parser");

class VaccineSlotScheduler {

    constructor() {}

    schedule() {
        setInterval(this.executeTask , 1000 * 6);
    }

    executeTask() {
        const vaccineSlotService = new VaccineSlotService();
        const slotPromise = vaccineSlotService.fetchSlots(696 , new Date());

        slotPromise.then( schemaJson => {
            // parse slots data and make a flat list.
            const flatSlots = VaccineSlotParser.parse(schemaJson);

            // upsert flatSlots into mongo db.
            
        } ).catch( responseStatus => {
            console.error("Vaccine SLot API failed with status " + responseStatus);
        });
        
        
    }


}

module.exports = VaccineSlotScheduler