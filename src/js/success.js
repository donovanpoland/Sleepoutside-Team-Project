import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

// Listen for cart updates from other pages
window.addEventListener("cartUpdated", updateCartCount);


document.addEventListener("DOMContentLoaded", () => {
  // insert header and footer - wait for it to finish before updating cart count
  // update cart count after header is loaded
  loadHeaderFooter().then(updateCartCount);
});