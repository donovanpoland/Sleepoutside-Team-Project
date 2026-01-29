import { renderListWithTemplate, getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

// Template for a cart item
function cartItemTemplate(item, index) {
    const newItem = `<li class="cart-card divider">
    <button class="cart-card__delete" data-index="${index}" title="Remove item">❌</button>
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
    // Returning the constructed HTML string
    return newItem;
}

export default class ShoppingCart {
    constructor(cartElement, cartTotalElement) {
        this.cartElement = cartElement;
        this.cartTotalElement = cartTotalElement;
        this.total = 0;
    }

    async init() {
        // Fetch cart items from local storage
        const cartItems = this.fetchCartItems();
        this.renderCart(cartItems);
        this.attachDeleteListeners();
    }

    fetchCartItems() {
        // Get cart from local storage
        return getLocalStorage("so-cart") || [];
    }

    renderCart(cartItems) {
        // Use renderListWithTemplate utility function with clear=true to remove old items
        renderListWithTemplate(cartItemTemplate, this.cartElement, cartItems, "afterbegin", true);
        this.updateCartTotal(cartItems);
    }

    updateCartTotal(cartItems) {
        // Calculate total
        const total = cartItems.reduce((sum, item) => sum + item.FinalPrice * (item.quantity || 1), 0);
        if (this.cartTotalElement) {
            this.cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        }
        setLocalStorage("subtotal", total.toFixed(2))
    }

    deleteItem(index) {
        let cartItems = this.fetchCartItems();
        cartItems.splice(index, 1);
        setLocalStorage("so-cart", cartItems);
        // Re-render and re-attach listeners after deletion
        this.renderCart(cartItems);
        this.attachDeleteListeners();
        updateCartCount();
    }

    attachDeleteListeners() {
        // Remove old listeners to prevent duplicates
        document.querySelectorAll(".cart-card__delete").forEach((btn) => {
            btn.removeEventListener("click", this.handleDeleteClick);
        });
        // Attach fresh listeners
        document.querySelectorAll(".cart-card__delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const itemIndex = e.target.dataset.index;
                this.deleteItem(itemIndex);
            });
        });
    }
}