import Product from "../Models/product.model.js";

export const addProductsServices = async (data, id, imageData) => {
  // raw data
//   [
//   { url: "img1-url", id: "abc1" },
//   { url: "img2-url", id: "abc2" }
// ]
  //  make in db format 
 const images = imageData.map((img)=>{
  return {
    url: img.url, // url is the name in schema img url conatin data a
    id: img.id //idi is the field name in db 
  }
 })
  const {
    title,
    description,
    price,
    discountprice,
   // images,
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
    images : images,
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

// get all products
export const getAllproductsService = async (query) => {
  // we can find products on the baisis of query such as category ,brand price etc
  //step 1 => destructe the proprty
  const { category, brand, minPrice, maxPrice, search, page,limit  } = query; // comes from url req.query
  //step 2 => create a empty filter object for the purpose of filtering
  const filter = {};
  // step 3 if url conatin any category then add it in filter and find on basis on it
  if (category) {
    // it adds the category to filter object
    filter.category = category;
  }
  // step 4 same for brand
  if (brand) {
    // it adds the brand to filter object
    filter.brand = brand;
    // final qury become product.find({brand: "iphone"})
  }
  // for serch
  if (search) {
    // we use title becuse we define name as title in product schema and find serch on bais of it
    filter.title = { $regex: search, $options: "i" }; // we use {} becuse mongo db accept condion in object not plain conditin like $regex,option
    // regex => serch on baises on words  i => return evry thing that has i or optio "i" makes I and i same case innsenitive
  }
  // now check for the min and max price
  if (minPrice || maxPrice) {
    // if any one of exist then
    filter.price = {}; // first epmty then add
    if (minPrice) filter.price.$gte = Number(minPrice);
    // then it become filter:{
    //price:{
    // $gte: 1000 // stidfy condition in {} and qury we get minPrice in string so convert to num
    //}
    //}
    // same for max
    if(maxPrice) filter.price.$lte = Number(maxPrice); // if it add this 

  }
  //pageination logic 
  const pageNum = Number(page) || 1 // if not set by user bydefult 1
  const itemPerPage = Number (limit) || 10 
  const skip = (pageNum -1) * itemPerPage //=> if page 2 2-1 =1* 10 =10 skip 10 itmes
  const productsAll = await Product.find(filter).skip(skip).limit(itemPerPage);
  //total
   const total = await Product.countDocuments(filter);
   const pages = Math.ceil(total/itemPerPage)
  return {productsAll,
    total,
    page: pageNum,
    pages
  };
};
// get product by id for deail page
export const getProductbyIdService = async (id) => {
  // in case did not get Id from frontend
  if (!id) {
    const error = new Error("did't get the id product");
    error.StatusCode = 400;
    throw error;
  }
  // find the product from db on the basis of Id
  const findbyId = await Product.findById(id);

  if (!findbyId) {
    // if did not find product with that Id
    const error = new Error("did get the product");
    error.StatusCode = 400;
    throw error;
  }
  return findbyId;
};
// update products
export const updateProductService = async (data, id) => {
  // in case did not get the id from the parameter
  if (!id) {
    const error = new Error("did not get product id from params");
    error.StatusCode = 400;
    throw error;
  }
  const updateProduct = await Product.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  // if the update product is not success
  if (!updateProduct) {
    const error = new Error("cant update the products");
    error.StatusCode = 400;
    throw error;
  }
  return updateProduct;
};
// delete Product
export const deleteProductService = async (id) => {
  // check for id
  if (!id) {
  const error = new Error("Product ID is required");
  error.statusCode = 400;
  }
  const delproduct = await Product.findByIdAndDelete(id);
  //check if del or not
  if (!delproduct) {
  const error = new Error("Product not found");
  error.statusCode = 404;
  throw error;
  }
  return delproduct;
};
