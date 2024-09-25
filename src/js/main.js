import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

import ProductListing from "./ProductList.mjs";

const productList = new ProductListing("tents", dataSource, document.getElementById("productList"));