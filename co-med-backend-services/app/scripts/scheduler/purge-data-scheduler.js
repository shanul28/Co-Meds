const DAO = require("../vaccine-slot-DB/DAO")
const dao = new DAO();
const config = require("config")
const time = config.get("scheduler.purge_data_scheduler_time_interval_in_ms");

class PurgeDataScheduler {
    constructor() { }

    /**
     * scheduleRemove() execute removal task 
     * after given time(24 hour)
     */
    schedule() {
        setInterval(this.executeRemoveTask, time)
    }

    executeRemoveTask() {
        //Removes prevoius day data from DB
        dao.removeDataByDay();
    }
}

module.exports = PurgeDataScheduler