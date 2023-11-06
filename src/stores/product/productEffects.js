import axios from "axios";
import { BASE_URL } from "../../utils/StaticData";

class ProductEffects {
  // Get Product Details
  static getProductDetails = async (id) => {
    const response = await axios.get(`${BASE_URL}/product/${id}`);
    return response.data;
  };

  // Get Product Details
  static reviewProduct = async (userReview) => {
    const response = await axios.patch(`${BASE_URL}/products/`, userReview);
    return response.data;
  };

  // Get Similar Products
  static getSimilarProducts = async (id) => {
    const response = await axios.post(`${BASE_URL}/product/similar`, { id });
    return response.data;
  };
}

export default ProductEffects;
