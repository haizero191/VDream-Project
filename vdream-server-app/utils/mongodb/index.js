const mongoose = require("mongoose");
require('dotenv').config()



async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("➤ Database connect successfully !")
    } catch(error) {
        console.log("Database connect failer", error)
    }
}

module.exports = {connect};