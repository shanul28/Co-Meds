const MongodbSetup = require("./vaccine-db");
const mongodbSetup = new MongodbSetup();
const VaccineModel = mongodbSetup.makeModel();

// const districtCode = config.get('http.parameters.district_code');
class DAO{
        
        constructor(){}

        insertInDB(flatArray){ 
                const queryArray = [];
                flatArray.forEach(obj => {
                        const query = {
                                updateOne : {
                                        filter: {id: obj.id},
                                        update: obj,
                                        upsert: true
                                }
                        }
                        queryArray.push(query);
                });
                VaccineModel.bulkWrite(queryArray, (err, res) => {
                        if(err){
                                console.log(err);
                        }else{
                                console.log(res);
                        }
                });

                /* arr.forEach(obj => {
                        VaccineModel.updateOne({ id: obj.id }, obj, { upsert: true }).exec().then(ob => {
                                console.log(ob);
                        }).catch(d=> {
                                console.log("failed");
                        });
                        // VaccineModel.update({ id: obj.id }, {$set: obj}, { upsert: true });
                }); */ 
                
              /* VaccineModel.insertMany(...arr, (err) => {
                if (err) {
                        console.log(err);
                } else {
                        console.log("Vaccine data added into CoMedDB!!");
                }
                }); */
        }
}

module.exports = DAO