import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, loadHeaderFooter, getParam } from "./utils.mjs";

window.addEventListener("cartUpdated", updateCartCount);

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();
    updateCartCount();

    // 🔑 THIS is the missing piece
    const category = getParam("category") || "tents";

    // Update page heading
    const heading = document.querySelector("#productHeading");
    if (heading) {
        heading.textContent = `Top Products: ${formatCategory(category)}`;
    }

    const dataSource = new ProductData();
    const element = document.querySelector(".product-list");

    const productList = new ProductList(category, dataSource, element);
    productList.init();
});

// helper for nicer titles
function formatCategory(category) {
    return category
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
}
