import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";
import Alert from "./Alert.js";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);
productList.init();
updateCartCount();

const alert = new Alert("/json/Alerts.json");
alert.init();
  


// Listen for cart updates from other pages
window.addEventListener("cartUpdated", updateCartCount);
