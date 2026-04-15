// first step to create an api to crete its model /schema 
import mongoose from "mongoose"; // first step is to import the mongoose 
// then use new keyword moongose.schema to define schema/ fields
import bcrypt from 'bcrypt'; // to hash password 
const userSchema = new mongoose.Schema({
    username:{
        type: String, // define its data type string
        required: true, // required true means must require field cant be empty 
        trim: true // remove extra spaces like "  suryansh"=> "suryansh"
    },
    email:{
        type: String, // its type is String
        required: true, // must filed
        unique: true, // the unique true means no two user cant have same email
    },
    password:{
        type: String,
        required: true,
    },
    // rest of fields =>address and other 
    address:{
        street: String,
        city: String,
        zip: String,
        state: String,
        country: String
    },
    // profile
    profile:{
        type: String,
    },
    //role
    role:{
        type:String,
        enum:["admin","user"], // enum is use to define the field where you only add the value that are in enum 
        default:"user", // def is user we create admin by ourself 
    }
})
userSchema.pre("save", async function(){
    const salt =  await bcrypt.genSalt(10); // gerrate rendom value called salt
    const bcryptpassword = await bcrypt.hash(this.password, salt); // bcypt password with salt before saving
    this.password = bcryptpassword;// save password
});

// create a methord /function to compare password 
userSchema.methods.comparePassword =  async function(EnterPassword){ 
    const compare  = await bcrypt.compare(EnterPassword, this.password);
    return compare; // true or false 
}
// now create the modal for schema 
const Auth = mongoose.model("Auth", userSchema) // by defult the collection will become lowercase and prural Auth => auths
export default Auth // export this auth it provide us to perform CURD opertion on that model 