
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";



const tentData = new ProductData("tents");

const element = document.querySelector(".product-list");
const list = new ProductListing("tents", tentData, element);

list.init();
<<<<<<< HEAD

=======
>>>>>>> ea89de035200e53d89a1e7ab9867c5988cc00a1f
