import jwt from "jsonwebtoken";

 export const genToken = async (data) => {
  const token = jwt.sign( // use to sign genrate key 
    { id: data._id, role: data.role }, // it cann decrypt later and we get data of these fields 
    process.env.JWT_SECRET, // secret key 
    { expiresIn: "1d" }, //this will be expires in 1d
  );
  return token;
};
