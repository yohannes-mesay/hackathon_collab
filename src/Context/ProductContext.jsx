import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://aguero.pythonanywhere.com";

const ProductContext = createContext();
const initialState = {
  user: null,
  isLoading: false,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "product/upload":
      return {
        ...state,
      };
    default:
      throw new Error("Unknown action");
  }
}
function ProductProvider({ children }) {
  async function uploadProduct(productData) {
    const token = localStorage.getItem("token");
    let config = null;

    if (token) {
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      };
    } else {
      console.error("Token not found in localStorage");
    }

    try {
      console.log(token);
      const res = await axios.post(`${BASE_URL}/product`, productData, config);
      alert("Product uploaded successfully");
      console.log("Product uploaded:", res.data);

      return res.data;
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  }
  async function getProduct() {
    try {
      const res = await axios.get(`${BASE_URL}/product/`);
      console.log("Product:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error getting product:", err);
    }
  }

  return (
    <ProductContext.Provider value={{ uploadProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined)
    throw new Error("ProductContext used outside provider");
  return context;
}

export { ProductProvider, useProduct };
