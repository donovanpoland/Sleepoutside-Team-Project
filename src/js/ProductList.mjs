import { renderListWithTemplate } from "./utils.mjs";

// Base URL for backend (safe, removes trailing slash if present)
const baseURL = import.meta.env.VITE_SERVER_URL.replace(/\/$/, "");

// Helper to safely build image URLs
function buildImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseURL}${path}`;
}

// Template for each product card
function productCardTemplate(product) {
  const image =
    product.PrimaryMedium ||
    product.Images?.PrimaryMedium ||
    product.Image ||
    product.Images?.PrimaryImage;

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img 
        src="${buildImageUrl(image)}" 
        alt="Image of ${product.Name}" 
      />
      <h2 class="card__brand">${product.Brand?.Name ?? ""}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}
