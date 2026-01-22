import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

// insert header and footer - wait for it to finish before updating cart count
await loadHeaderFooter();

// update cart count after header is loaded
updateCartCount();