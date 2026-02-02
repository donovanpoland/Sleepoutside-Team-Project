import { renderListWithTemplate, getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

// Template for a cart item
function cartItemTemplate(item, index) {
    const newItem = `<li class="cart-card divider">
    
    <a href="#" class="cart-card-image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card-name">${item.Name}</h2>
    </a>
    <p class="cart-card-color">${item.Colors[0].ColorName}</p>
    <p class="cart-card-quantity">qty: ${item.quantity || 1}</p>
    <button class="cart-card-delete" data-index="${index}" title="Remove item">❌</button>
    <p class="cart-card-price">$${item.FinalPrice}</p>
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
        const idx = Number(index);
        const item = cartItems[idx];
        if (!item) return;
        // Decrement quantity if more than 1, otherwise remove the item
        if ((item.quantity || 1) > 1) {
            item.quantity = (item.quantity || 1) - 1;
        } else {
            cartItems.splice(idx, 1);
        }
        setLocalStorage("so-cart", cartItems);
        // Re-render and re-attach listeners after update
        this.renderCart(cartItems);
        this.attachDeleteListeners();
        updateCartCount();
    }

    attachDeleteListeners() {
        // Remove old listeners to prevent duplicates
        document.querySelectorAll(".cart-card-delete").forEach((btn) => {
            btn.removeEventListener("click", this.handleDeleteClick);
        });
        // Attach fresh listeners
        document.querySelectorAll(".cart-card-delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const itemIndex = e.target.dataset.index;
                this.deleteItem(itemIndex);
            });
        });
    }
}