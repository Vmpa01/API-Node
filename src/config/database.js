const mongoose = require ("mongoose")
const connectDB =async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/datum")
        console.log("MongoDB conectado exitosamente")
    } catch(error){
        console.error("Error al conectar a mongoDB: ", error)
    }
    
}
connectDB()
module.exports = connectDB