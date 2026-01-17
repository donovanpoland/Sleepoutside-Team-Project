import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

async function initProductPage() {
  try {
    // Get product id from URL query
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product");
    if (!productId) return; // nothing to do

    // Find product
    const product = await dataSource.findProductById(productId);
    if (!product) return; // invalid product id

    // Render product safely
    const container = document.querySelector(".product-detail");
    if (!container) return; // no container, stop

    container.innerHTML = `
      <h1>${product.Name}</h1>
      <img src="${product.Image}" alt="${product.Name}">
      <p>Brand: ${product.Brand.Name}</p>
      <p>Price: $${product.FinalPrice}</p>
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    `;

    // Attach click event safely
    const button = document.getElementById("addToCart");
    if (button) {
      button.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
        cart.push(product);
        setLocalStorage("so-cart", cart);
        alert(`${product.Name} added to cart!`);
      });
    }

  } catch (err) {
    console.error("Product page failed:", err);
    // Don't throw — just stop, page won't break
  }
}

// Run it
initProductPage();