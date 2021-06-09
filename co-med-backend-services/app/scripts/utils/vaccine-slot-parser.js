const moment = require("moment");
const config = require("config");
const districtCode = config.get("http.parameters.district_code");

class VaccineSlotParser {
    constructor() {}
    /** 
     * The method transforms the schema JSON, 
     * received from the API call, 
     * into a flat JSON array. 
     */
    static parse(schemaJson) {
        const flatSlotArray = []; 
        const centers = schemaJson.centers ;
        for(var i = 0; i< centers.length ; i++) {
            const center = centers[i] || {};
            const sessions = center.sessions || [];
            for(var j = 0; j< sessions.length; j++){
                const session = sessions[j] || {};
                const obj = VaccineSlotParser._createFlatObject(center, session);
                flatSlotArray.push(obj);
            } 
        }   
        return flatSlotArray ;
    }

    /** 
     * createFlatObject() extracts desired data like
     *  pincode , available vaccine dose etc
     *  from a center & session. 
     */
    static _createFlatObject(center, session) {
        return {
            id: districtCode + "-" + center.pincode + "-" + center.center_id + "-" + session.date,
            center_id: center.center_id,
            name: center.name,
            pincode: center.pincode,
            date: session.date,
            available_capacity: session.available_capacity,
            address: center.address,
            block_name: center.block_name,
            lat: center.lat,
            long: center.long,
            fee_type: center.fee_type,
            available_capacity_dose1: session.available_capacity_dose1,
            available_capacity_dose2: session.available_capacity_dose2,
            min_age_limit: session.min_age_limit,
            vaccine: session.vaccine,
            today_date: moment().format("DD-MM-YYYY")
        }
    }
}

//exporting VaccineSlotParser class
module.exports = VaccineSlotParser