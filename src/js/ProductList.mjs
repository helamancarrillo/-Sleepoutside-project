import { renderListWithTemplate } from "./utils.mjs";

function productListTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductListing {
  // constructor housing the category ,dataSource and listElement of the Productlisting class
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    const listToRender = this.filterProductList(list);
    console.log(list);
    this.renderList(listToRender);
  }

  // renderList(list) {
  //   const htmlString = list.map(productListTemplate);
  //   this.listElement.insertAdjacentHTML("afterbegin", htmlString.join(""));
  // }
  // filterProductList(list) {
  //   list.filter((el) => el.product.Name);
  // }

  // Get the first 4 unique products

  filterProductList(list) {
    const uniqueProducts = list.filter(
      (list, index, self) =>
        index ===
        self.findIndex(
          (el) =>
            el.NameWithoutBrand.split("-")[0] ===
            list.NameWithoutBrand.split("-")[0],
        ),
    );

    return uniqueProducts;
  }

  renderList(list) {
    renderListWithTemplate(
      productListTemplate,
      this.listElement,
      list,
      "afterbegin",
    );
  }
}