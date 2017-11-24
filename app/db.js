const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/social', function(){
    console.log.bind(console,"Connected!");    
});
mongoose.Promise = global.Promise;

module.exports = mongoose;