import axios from "axios";

const API_URL = "/data/products.json";

export const fetchAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return Object.values(res.data).flat();
  } catch (error) {
    console.error("Eroare la fetchAllProducts:", error.message);
    throw error;
  }
};

export const fetchProductsByBrand = async (brandName) => {
  try {
    const res = await axios.get(API_URL);
    return res.data[brandName] || [];
  } catch (error) {
    console.error("Eroare la fetchProductsByBrand:", error.message);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const all = await fetchAllProducts();
    return all.find((p) => String(p.id) === String(id)) || null;
  } catch (error) {
    console.error("Eroare la fetchProductById:", error.message);
    throw error;
  }
};

export const fetchRawProductsData = async () => {
  try {
    const res = await axios.get("/data/products.json");
    return res.data;
  } catch (error) {
    console.error("Eroare la fetchRawProductsData:", error.message);
    throw error;
  }
};
