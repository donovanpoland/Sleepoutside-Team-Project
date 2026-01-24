import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

window.addEventListener("cartUpdated", updateCartCount);

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    updateCartCount();
  });
});
