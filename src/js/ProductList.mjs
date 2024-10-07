import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // const list = await this.dataSource.getData();
        const list = await this.dataSource.getData(this.category);

         // reduce product list to first 4 products
         let newList = list.filter((product, i) => i < 4);

        // render the list
        this.renderList(newList);
        // replace non alpha character with " " and capitalize each word
        const catTitle = this.category.replace(/[^a-z]/gi, " ").replace(/\b\w/g, char => char.toUpperCase());
        // concatenate the "Top Products heading with the category title"
        document.querySelector(".title").innerHTML = catTitle;
    }

    renderList(list) {
      renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", false);
    }

}
