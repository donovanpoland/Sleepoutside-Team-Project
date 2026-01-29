import { getLocalStorage, setLocalStorage, updateCartCount, notifyCartChange } from "./utils.mjs";



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
        // Get cart items from local storage or init an empty array
        const cartItems = getLocalStorage("so-cart") || [];

        const existingItem = cartItems.find((item) => item.Id === this.product.Id);

        if (existingItem) {

            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cartItems.push({ ...this.product, quantity: 1 });
        }

        //cartItems.push(this.product);

        // Save back to storage
        setLocalStorage("so-cart", cartItems);
        // Trigger cart icon animation
        this.animateCartIcon();
        // Notify all pages that cart has changed
        notifyCartChange();
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
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}


function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
    document.querySelector("#p-brand").textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector('#productImage');
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;

    document.querySelector("#productPrice").textContent = `$${product.FinalPrice.toFixed(2)}`;
    document.querySelector("#productColor").textContent = product.Colors[0].ColorName;
    document.querySelector("#productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.querySelector("#addToCart").dataset.id = product.Id;

}

updateCartCount();

/*    document.getElementById('productPrice').textContent = `$${product.FinalPrice}`;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;*/