import axios from "axios";
import { handleLogout } from "../helper/handleLogout";

const UseApi = async (url, method = "get", body = undefined) => {
  try {
    // Make an request using Axios with the provided URL and HTTP method (defaulting to "get" if not provided)
    const result = await axios({
      method: method || "get",
      url: url,
      data: body || " ",
      withCredentials: true,
    });

    // If the request is successful, return the data from the response
    return result?.data;
  } catch (error) {
    const { response } = error;
    // Check if the error response contains the message "Session expired"
    if (response?.data?.status === 401) {
      await handleLogout("Session Timout!");
    }
    return response;
  }
};

export default UseApi;
