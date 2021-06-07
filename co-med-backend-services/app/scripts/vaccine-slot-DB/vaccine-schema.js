const mongoose = require("mongoose");
const MongodbSetup = require("./vaccine-db");
// const mongodbSetup = new MongodbSetup();
// const VaccineModel = mongodbSetup.makeModel();

class Schema{

    constructor(){}
    
    vaccineSlotSchema(){
        const vaccineSchema = new mongoose.Schema({
        id: {
            type: String,
            index: "1",
            unique: true
        } 
          /*   _id: {
                type: Object,
                unique: true
            } */ ,
        center_id: Number,
        name:{
            type: String,
            index: 1,
          
        },
        pincode: {
            type: Number,
            index: 1,
          
        },
        date: {
                type: String,
                index: 1,
              
        },
        available_capacity: Number,
        age: Number
        // center_id: Number,
        // name: String,
        // address: String,
        // block_name: String,
        // pincode: String,
        // vaccine: String,
        // fee: String
        // date: String,
        // available_capacity: Number,
        // available_capacity_dose1: Number,
        // available_capacity_dose2: Number,
        // min_age_limit: Number,
        // vaccine: String,
        });
       
         return vaccineSchema;
    } 
    
}

module.exports = Schema