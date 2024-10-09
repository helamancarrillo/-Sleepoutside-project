import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const tentData = new ExternalServices("tents");
const element = document.querySelector(".product-list");
const list = new ProductListing("tents", tentData, element);

list.init();