const express = require("express");
const app = express();
const CoMedApp = require("./co-med-app");

console.log("Initializing Co-Med app...");

new CoMedApp();
console.log("Co-Med app initialized successfully...");

/*  app.listen(8000, function () {
    console.log("server running at port 8000")
});
 */