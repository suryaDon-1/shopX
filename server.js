import connect from "./api/config/db.js";
import app from "./index.js";
// dot env stores the confidential data like portno ,keys ,dburl
import dotenv from 'dotenv';

dotenv.config(); // dotenv config is provide hand to get the data from env file via process name object
connect();

const PORT = process.env.PORT || 8000 // in any case env might not work so it takes 8000 as defult value

// now app.listen make the server avliable create a server 
app.listen(8000, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
