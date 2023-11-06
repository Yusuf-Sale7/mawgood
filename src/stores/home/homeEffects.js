import axios from "axios";
import { BASE_URL } from "../../utils/StaticData";

class HomeEffects {
  // Get Categories
  static getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  };

  // Get Top Categories
  static getTopCategories = async () => {
    const response = await axios.get(`${BASE_URL}/top_categories`);
    return response.data;
  };

  // Get Offers
  static getOffers = async () => {
    const response = await axios.get(`${BASE_URL}/offers`);
    return response.data;
  };

  // Get Top Products
  static getTopProducts = async () => {
    const response = await axios.get(`${BASE_URL}/search?rate=all&limit=8`);
    return response.data;
  };

  // Get Partners
  static getPartners = async () => {
    const response = await axios.get(`${BASE_URL}/partners`);
    return response.data;
  };
}

export default HomeEffects;
