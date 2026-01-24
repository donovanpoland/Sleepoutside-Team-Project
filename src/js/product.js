import { getParam, updateCartCount, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

window.addEventListener("cartUpdated", updateCartCount);

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  updateCartCount();

  const dataSource = new ProductData();
  const productId = getParam("product");
  const product = new ProductDetails(productId, dataSource);
  product.init();
});
