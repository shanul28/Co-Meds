const MongodbSetup = require("./vaccine-db");
const mongodbSetup = new MongodbSetup();
const VaccineModel = mongodbSetup.makeModel();

/**
 * DAO class has two method 
 * 1.insertInDB() - 
 *      It performs upsert operation into CoMedDB
 * 2. removeDataByDay()-
 *      It performs deletion operation on CoMedDB
 */
class DAO {
        
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
        /**
         * removeDataByDay() checks if 
         * today's date string and Slot's date string
         * are equal then it performs deleteOne operation
         * and push the query into removeQueryArray[]
         */
        removeDataByDay(flatArray){
                const removeQuery = [];
              
                flatArray.forEach(object => {
                       if (object.date === object.today_date){
                                const query = {
                                        deleteOne: {    
                                        filter: {
                                                 id: object.id
                                                }
                                        }
                                }
                                removeQuery.push(query);
                        }
                });
                /**
                 * if removeQuery has any query
                 * then bulWrite() performs deleteOne 
                 * operation in bulk 
                 */
                if(removeQuery.length != 0){
                        VaccineModel.bulkWrite(removeQuery, (err, res) => {
                        if (err) {
                                console.log("Error , documents not deleted - " + err);
                        } else {
                                console.log("documents deleted -" + res);
                        }
                        })
                }

        } 
}

module.exports = DAO