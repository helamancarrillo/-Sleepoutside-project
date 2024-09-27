import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
              <img
                src=${product.Image}
                alt="Image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p></a>
          </li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();

        // reduce product list to first 4 products
        let newList = list.filter((product, i) => i < 4);

        // render the list
        renderListWithTemplate(productCardTemplate, this.listElement, newList, "afterbegin", false);
    }

    // renderList(list) {
    //     const htmlStrings = list.map(productCardTemplate);  
    //     this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    // }
}