import { addToCart, updateCartCount, notifyCartChange, weserv } from "./utils.mjs";



export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // the product details are needed before rendering the HTML
        this.renderProductDetails();
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        // Use centralized helper to add product (handles dedupe and qty)
        addToCart(this.product, 1);
        // Trigger cart icon animation
        this.animateCartIcon();
    }

    animateCartIcon() {
        // Find the cart SVG icon
        const cartSvg = document.querySelector('.cart svg');
        if (cartSvg) {
            // Add the animation class
            cartSvg.classList.add('bounce-animation');
            // Remove the class after animation completes so it can be triggered again
            setTimeout(() => {
                cartSvg.classList.remove('bounce-animation');
            }, 600); // Match the animation duration
        }
        // Notify all pages that cart has changed
        notifyCartChange();
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}


function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
    document.querySelector("#p-brand").textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;
    const images = product.Images || {};
    const baseUrl =
      images.PrimaryExtraLarge ||
      images.PrimaryLarge ||
      images.PrimaryMedium ||
      images.PrimarySmall ||
      product.Image ||
      "";
    const productImage = document.querySelector('#productImage');
if (baseUrl) {
      productImage.src = weserv(baseUrl, 600); // main fallback
      productImage.srcset = [
        `${weserv(baseUrl, 320)} 320w`,
        `${weserv(baseUrl, 600)} 600w`,
        `${weserv(baseUrl, 900)} 900w`,
      ].join(", ");
      productImage.sizes = "(min-width: 900px) 500px, 90vw";
    } else {
      productImage.src = "";
    }

    productImage.alt = product.NameWithoutBrand;
    productImage.title = product.Name;

    document.querySelector("#productPrice").textContent = `$${product.FinalPrice.toFixed(2)}`;
    document.querySelector("#productColor").textContent = product.Colors[0].ColorName;
    document.querySelector("#productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.querySelector("#addToCart").dataset.id = product.Id;

}

updateCartCount();