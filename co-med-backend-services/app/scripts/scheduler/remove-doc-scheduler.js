const DAO = require("../vaccine-slot-DB/DAO")
const dao = new DAO();
const config = require("config")
const time = config.get("scheduler.removal_time_interval_in_ms");
const VaccineSlotParser = require("../utils/vaccine-slot-parser")
const VaccineSlotService = require("../service/vaccine-slot-service")
const districtCode = config.get('http.parameters.district_code');


class removeDocSchedule{
    constructor(){}

    /**
     * scheduleRemove() execute removal task 
     * after given time(24 hour)
     */
    scheduleRemove(){
        setInterval(this.executeRemoveTask, time)
    }
    
    executeRemoveTask(){
        const vaccineSlotService = new VaccineSlotService();
        const slotPromise = vaccineSlotService.fetchSlots(districtCode, new Date());

        slotPromise.then(schemaJson => {
        
            const flatSlots = VaccineSlotParser.parse(schemaJson);
            //Removes yesterday data
            dao.removeDataByDay(flatSlots);
            
        }).catch(responseStatus => {
            //catch method runs when response code isn't 200.
            console.error("Vaccine Slot API failed with status " + responseStatus);
        });
    }
}

module.exports = removeDocSchedule