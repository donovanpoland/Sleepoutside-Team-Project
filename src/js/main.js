import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";
import Alert from "./Alert.js";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";



const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);


// insert header and footer - wait for it to finish before continuing
await loadHeaderFooter();
productList.init();



const alert = new Alert("/json/Alerts.json");
alert.init();
  


// Listen for cart updates from other pages
window.addEventListener("cartUpdated", updateCartCount);

// update cart count
updateCartCount();