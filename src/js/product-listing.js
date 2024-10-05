import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductListing(category, dataSource, element);
// const tentData = new ProductData("tents");
// const element = document.querySelector(".product-list");
// const list = new ProductListing("tents", tentData, element);


listing.init();
