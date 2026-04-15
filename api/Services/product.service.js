import Product from "../Models/product.model.js";

export const addProductsServices = async (data,id) => {
  const {
    title,
    description,
    price,
    discountprice,
    images,
    category,
    brand,
    stock,
  } = data;
  //here data pass as an obj but if we diretluy pass the data be data bcz its obj
  const product = await Product.create({
     title,
    description,
    price,
    discountprice,
    images,
    category,
    brand,
    stock,
    createdBy: id,
  });
  return product;
};
//or also we can write it like this 
// export const addservices = async(data)=>{
//     const add = await Product.create(data);
//     return add;
// }
