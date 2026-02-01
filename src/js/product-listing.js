import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const titleElement = document.querySelector(".title");
// Get category and title element, place catigory as title, make first letter captialized.
if(titleElement && category){
    const label = category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    titleElement.textContent = label;
}
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();