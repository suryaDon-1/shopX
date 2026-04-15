import Auth from "../Models/auth.model.js";

export const registerUserservice = async (data) => {
  // the data send from the controller in this case data = req.body
  //step 1 => extract /destructure all the fields from req.body bsz data came in json fromat from frontend
  const { username, email, password } = data;
  // add business logic here /validation here
  if (!username || !email || !password) {
    const error = new Error("Username ,email ,password must required");
    error.statusCode = 400;
    throw error;
  }
  // check if user already exist
  const user = await Auth.findOne({email}); // we use find one bsz find give us empty array if its not find and epmty [] is true so we camt validte
  if (user) {
    const error = new Error(
      "user with this email alredy exists Try another email...",
    );
    error.statusCode = 400;
    throw error;
  }
  const creteUser = await Auth.create({ // create query is use to store the details in schema if every thing is good 
    username,
    email,
    password,
  });
  return creteUser // return crete user to use in controller 
};

export const loginUserservice = async(data)=>{
  const {email,password}= data // detsutrre the email and password from data 
  //step 1 => check that email and password has data 
  if(!email || !password){
    const error = new Error("Both Email and password is Required");
    error.statusCode = 400; // 400 error code 
    throw error // here we use throw error that will directly goes to the errorMiddlwrae via asynchadler // we do not need next(error)
  }
  // step 2 => check that userExist or not 
  const user = await Auth.findOne({email});
  if(!user){
    const error = new Error("User not exist sigUp first..");
    error.statusCode = 400;
    throw error; // if we dont wrap in asynchadler we send error via next (error)
  }
  //step 3 => check for password 
   const checkPassword = await user.comparePassword(password); // it methord we define in our schema 
   if(!checkPassword){
    const error = new Error("Password did not match");
    error.statusCode = 400;
    throw error;
   }   
   return user;
}
