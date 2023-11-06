import axios from "axios";
import { BASE_URL } from "../../utils/StaticData";

class UserEffects {
  // Get user's favorites
  static getUserFavorites = async (username) => {
    const response = await axios.get(`${BASE_URL}/favorites/${username}`);
    return response.data;
  };

  // Add product to favorites
  static addFavoriteProduct = async (username, id) => {
    const response = await axios.post(`${BASE_URL}/favorites/add`, {
      username,
      id,
    });
    return response.data;
  };

  // Remove product from favorites
  static removeFavoriteProduct = async (username, id) => {
    const response = await axios.post(`${BASE_URL}/favorites/delete`, {
      username,
      id,
    });
    return response.data;
  };

  // Get cart products
  static getCart = async (username) => {
    const response = await axios.get(`${BASE_URL}/cart/${username}`);
    return response.data;
  };

  // Update cart
  static updateCart = async (username, id, quantity, size, color) => {
    const response = await axios.patch(`${BASE_URL}/cart/update`, {
      username,
      id,
      quantity,
      size,
      color,
    });
    return response.data;
  };
}

export default UserEffects;
