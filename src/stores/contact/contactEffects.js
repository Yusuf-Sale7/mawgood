import axios from "axios";
import { BASE_URL } from "../../utils/StaticData";

class ContactEffects {
  // Send Review
  static sendMessage = async (message) => {
    const response = await axios.post(`${BASE_URL}/contact`, message);
    return response.data;
  };
}

export default ContactEffects;
