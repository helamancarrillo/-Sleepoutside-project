import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// const product = new ProductData("tent");
// const productList = new ProductList(category, dataSource, listElement);
// console.log(product);
// console.log(productList);

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();
