<<<<<<< HEAD
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
=======
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();
>>>>>>> ea89de035200e53d89a1e7ab9867c5988cc00a1f

const dataSource = new ProductData("tents");
const productId = getParam("product");

const details = new ProductDetails(productId, dataSource);
details.init();

// console.log(productId);
// console.log(dataSource.findProductById(productId));

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   details.addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
