import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

//function addProductToCart(product) {
//  setLocalStorage("so-cart", product);
//}

function addProductToCart(product) {
  const existingCart = getLocalStorage("addToCart") || []; // Retrieve existing items
  existingCart.push(product); // Append the new product
  setLocalStorage("addToCart", existingCart); // Save back to local storage
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button jk 
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
