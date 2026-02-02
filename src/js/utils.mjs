// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// Add product to cart (dedupe by Id and update quantity)
export function addToCart(product, qty = 1) {
  const cartItems = getLocalStorage("so-cart") || [];
  const existing = cartItems.find((item) => String(item.Id) === String(product.Id));
  if (existing) {
    existing.quantity = (existing.quantity || 1) + qty;
  } else {
    cartItems.push({ ...product, quantity: qty });
  }
  setLocalStorage("so-cart", cartItems);
  // Notify listeners and update badge
  notifyCartChange();
  updateCartCount();
}

// render a list of items using a template function
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// update cart count badge for shopping cart
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  // count total quantity not distinct items
  const count = cartItems
    ? cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    : 0;
  const cartCountElement = qs(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}
// dispatch a custom event when cart changes
export function notifyCartChange() {
  window.dispatchEvent(new Event('cartUpdated'));
}

export async function loadHeaderFooter() {
  // Add header to page
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#dy-header");
  renderWithTemplate(headerTemplate, headerElement);

  // Add header to page
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#dy-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

//alert custom error message
export function alertMessage(message, scroll = true) {
  // create element to hold the alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<span class="closebtn">&times;</span><strong>Alert!</strong> ${message}`;
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function(e) {
      if(e.target.tagName === "SPAN") { // how can you tell if they clicked on the X or on something else?  hint: check out e.target.tagName or e.target.innerText
        main.removeChild(this);
      }
  })
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // you may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

//Weserv help function - convert income images to webp for beter network download speeds
export function weserv(url, width) {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp`;
  }