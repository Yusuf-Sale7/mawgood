import axios from "axios";
import { BASE_URL } from "../../utils/StaticData";

class SearchEffects {
  // Get Category
  static getCategory = async (category, sort, limit) => {
    const response = await axios.get(
      `${BASE_URL}/search?category=${category}&sort=${sort}&limit=${limit}`
    );
    return response.data;
  };

  // Search Products
  static searchProducts = async (
    query,
    category,
    minPrice,
    maxPrice,
    rate,
    sort,
    limit
  ) => {
    const response = await axios.get(
      `${BASE_URL}/search?${query ? `query=${query}&` : ""}${
        category ? `category=${category}&` : ""
      }${minPrice ? `minprice=${minPrice}&` : ""}${
        maxPrice ? `maxprice=${maxPrice}&` : ""
      }${rate ? `rate=${rate}&` : ""}${sort ? `sort=${sort}&` : ""}${
        limit ? `limit=${limit}` : ""
      }`
    );
    return response.data;
  };
}

export default SearchEffects;
