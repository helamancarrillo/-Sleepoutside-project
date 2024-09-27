import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);

product.init();
// console.log(dataSource.findProductById(productId));

//function addProductToCart(product) {
//  setLocalStorage("so-cart", product);
//}

// function addProductToCart(product) {
//   const existingCart = getLocalStorage("addToCart") || []; // Retrieve existing items
//   existingCart.push(product); // Append the new product
//   setLocalStorage("addToCart", existingCart); // Save back to local storage
// }

// add to cart button event handler
async function addToCartHandler(e) {
  // const product = await dataSource.findProductById(e.target.dataset.id);
  const product = await dataSource.findProductById(e.target.dataset.id);
  ProductDetails.addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
