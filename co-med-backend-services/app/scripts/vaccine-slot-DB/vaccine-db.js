const VaccineSlotScheduler = require("../scheduler/vaccine-slot-scheduler")
const VaccineSlotParser = require("../utils/vaccine-slot-parser");
const Schema = require("./vaccine-schema");
const mongoose = require("mongoose");
const config = require("config")
 

class MongodbSetup{

    constructor(){}

    makeModel(){
    
        const url = config.get("mongo.parameter.uri") +"CoMedDB";
        mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('MongoDB Connected...')).catch((err) => console.log(err));
        
            const VaccineSchema = new Schema();
           
            const VaccineDataByDistrict = mongoose.model("VaccineFlatData", VaccineSchema.vaccineSlotSchema());
            
        
    return VaccineDataByDistrict;

     }
}

module.exports = MongodbSetup 