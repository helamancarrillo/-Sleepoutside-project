productCardTemplate = (product) => {
    return `<li class="product-card">
       <a href="product_pages/index.html?product=">
          <img src="${product.image}" alt="${product.title}">
          <h3 class="card_brand"></h3>
          <h2 class="card_name">${product.title}</h2>
          <p class="product-card_price">$${product.price}</p>
        </a>
      </li>`;
  }

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      // We passed in this information to make our class as reusable as possible.
      // Being able to define these things when we use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }

    async init() {
      // our dataSource will return a Promise...so we can use await to resolve it.
      const list = await this.dataSource.getData();
      // render the list - to be completed
    }
  }