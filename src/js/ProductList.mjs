function productListTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/marmot-ajax-3.html">
      <img
        src="images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg"
        alt="Marmot Ajax tent"
      />
      <h3 class="card__brand">Marmot</h3>
      <h2 class="card__name">Ajax Tent - 3-Person, 3-Season</h2>
      <p class="product-card__price">$199.99</p>
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
    const list = await this.dataSource.getData();
  }

  renderList(selector) {
    const element = document.querySelector(selector);

    element.map((el) => el.productListTemplate());
  }
}
