const mongoose = require('mongoose')

const uri = 'mongodb://127.0.0.1:27017/paytmDB'

const dbconn = async ()=> {
    try {
        await mongoose.connect(uri);
        console.log("Connected to db");
    } catch (error) {
        handleError(error);
    }

}
module.exports = dbconn