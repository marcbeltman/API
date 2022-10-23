// connectie met de database

const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // bericht in terminal en laat zien dat de conectie met de database er is
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
}

// REALTIME LISTNER NAAR DE MONGO-DB DATABASE naar collection 'weirlogs'
const connection = mongoose.connection

connection.once("open", () => {
    console.log("MongoDB database connected")

    console.log("Setting change streams")
    const changeStream = connection.collection("weirlogs").watch()

    changeStream.on("change", (change) => {
        console.log(change)
    })
})





module.exports = connectDB;