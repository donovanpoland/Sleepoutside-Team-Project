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
    // Build image list: main image then extra images
    const images = [];
    if (product.Images && product.Images.PrimaryExtraLarge) images.push(product.Images.PrimaryExtraLarge);
    if (product.Images && Array.isArray(product.Images.ExtraImages)) {
        product.Images.ExtraImages.forEach((img) => {
            if (img && img.Src) images.push(img.Src);
        });
    }
    // fallback
    if (!images.length && product.Images && product.Images.PrimaryMedium) images.push(product.Images.PrimaryMedium);

    // Ensure main image exists before creating carousel
    if (!images.length) {
        productImage.src = '';
        productImage.alt = product.NameWithoutBrand;
    } else {
        // clean up any previous controls/thumbnails
        const prev = document.querySelector('#img-prev');
        if (prev) prev.remove();
        const next = document.querySelector('#img-next');
        if (next) next.remove();
        const thumbs = document.querySelector('.product-thumbnails');
        if (thumbs) thumbs.remove();

        let currentIndex = 0;
        productImage.src = images[currentIndex];
        productImage.alt = product.NameWithoutBrand;

        // create prev/next buttons when more than one image
        if (images.length > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.id = 'img-prev';
            prevBtn.type = 'button';
            prevBtn.className = 'img-nav';
            prevBtn.textContent = '◀';
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                productImage.src = images[currentIndex];
            });

            const nextBtn = document.createElement('button');
            nextBtn.id = 'img-next';
            nextBtn.type = 'button';
            nextBtn.className = 'img-nav';
            nextBtn.textContent = '▶';
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                productImage.src = images[currentIndex];
            });

            productImage.insertAdjacentElement('beforebegin', prevBtn);
            productImage.insertAdjacentElement('afterend', nextBtn);
        }

        // thumbnails
        const thumbsContainer = document.createElement('div');
        thumbsContainer.className = 'product-thumbnails';
        images.forEach((src, idx) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.alt = `${product.NameWithoutBrand} ${idx + 1}`;
            thumb.className = 'thumb';
            thumb.style.cursor = 'pointer';
            thumb.addEventListener('click', () => {
                currentIndex = idx;
                productImage.src = images[currentIndex];
            });
            thumbsContainer.appendChild(thumb);
        });
        productImage.insertAdjacentElement('afterend', thumbsContainer);
    }

    document.querySelector("#productPrice").textContent = `$${product.FinalPrice.toFixed(2)}`;
    document.querySelector("#productColor").textContent = product.Colors[0].ColorName;
    document.querySelector("#productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.querySelector("#addToCart").dataset.id = product.Id;

}

updateCartCount();