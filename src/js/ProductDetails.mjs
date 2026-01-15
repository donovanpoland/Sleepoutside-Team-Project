/*function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}*/

constructor(productId, dataSource){
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
}


/*export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}*/


function addProductToCart(product) {
  // Get cart items from local storage or init an empty array
  const cartItems = getLocalStorage("so-cart") || [];
  // Add product to cart
  cartItems.push(product);
  // Save back to storage
  setLocalStorage("so-cart", cartItems);
}