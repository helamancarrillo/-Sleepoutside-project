import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const tentData = new ProductData("tents");
const element = document.querySelector(".product-list");
const list = new ProductListing("tents", tentData, element);

list.init();
