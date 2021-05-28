class VaccineSlotParser {
    constructor() {}

    static parse(schemaJson) {
        const flatSlotArray = []; 
        const centers = schemaJson.centers ;
        for(var i = 0; i< centers.length ; i++) {
            const center = centers[i] || {};
            const sessions = center.sessions || [];
            for(var j = 0; j<sessions.length; j++){
                const session = sessions[j] || {};
                const obj = VaccineSlotParser.createFlatObject(center, session);
                flatSlotArray.push(obj);
            } 
        }
        console.log(flatSlotArray);
        return flatSlotArray ;
    }

    static createFlatObject(center, session) {
        return {
            center_id: center.center_id,
            name: center.name,
            pincode: center.pincode,
            date: session.date,
            available_capacity: session.available_capacity
        }
    }
}

module.exports = VaccineSlotParser