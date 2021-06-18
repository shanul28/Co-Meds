const MongodbSetup = require("./vaccine-db");
const mongodbSetup = new MongodbSetup();
const VaccineModel = mongodbSetup.makeModel();
const moment = require('moment');
/**
 * DAO class has two method 
 * 1.insertInDB() - 
 *      It performs upsert operation into CoMedDB
 * 2. removeDataByDay()-
 *      It performs deletion operation on CoMedDB
 */
class DAO {

        constructor() { }

        insertInDB(flatArray) {
                const queryArray = [];
                flatArray.forEach(obj => {
                        const query = {
                                updateOne: {
                                        filter: {
                                                id: obj.id
                                        },
                                        update: obj,
                                        upsert: true
                                }
                        }
                        queryArray.push(query);
                });
                VaccineModel.bulkWrite(queryArray, (err, res) => {
                        if (err) {
                                console.log(err);
                        } else {
                                console.log(res);
                        }
                });
        }

        /**
 * removeDataByDay() performs deletes
 * multiple documents from CoMedDB which is
 * older than current date.
 */
        removeDataByDay() {
                var yesterday = moment().subtract(1, 'days').toDate();
                VaccineModel.deleteMany({
                        vaccine_date: {
                                $lte: yesterday
                        }
                }).then(() => {
                        console.log("Documents deleted Succesfully!")
                }).catch((err) => {
                        console.log(err)
                });
        }
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

module.exports = DAO