import mongoose from "mongoose";
const connect = async()=>{
    try {
        mongoose.connect(process.env.MONGO);
        console.log("Mongoose is connected")
    } catch (error) {
        console.log("Mongoose is failed");
        process.exit(1); // if any case it failed then exit the process free sources
    }
}
// export the connect to the server file we use it there
export default connect 