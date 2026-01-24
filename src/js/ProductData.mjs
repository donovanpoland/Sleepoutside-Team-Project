function convertToJson(res) {
  if (res.ok) return res.json();
  throw new Error(`Bad response: ${res.status}`);
}

const baseURL = (import.meta.env.VITE_SERVER_URL || "").replace(/\/?$/, "/");

export default class ProductData {
  constructor() { }

  async getData(category) {
    const url = `${baseURL}products/search/${category}`;
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const url = `${baseURL}product/${id}`;
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }
}
