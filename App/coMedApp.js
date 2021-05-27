const express = require("express");
const app = express();
const hitter = require("C:/Users/Shanul/Desktop/Co-Med/App/scheduler/hitter");
require('dotenv').config();

class init{
constructor(){

}
 slot(){ hitter.hitSlot();
 
}
}

module.exports = {
  init,
}
app.listen(8000, function() {
  console.log("server running at port 8000")
})
 