import { toast } from "react-toastify";
import axios from "axios";

const ApiCall = async (url, method, navigate, setUser, data) => {
  console.log("******** Inside ApiCall function ********");

  if (method === "GET") {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error in API call:", error);
      setUser(null);
      handleErrors(error, navigate);
    }
  } else if (method === "POST") {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error("Error in API call:", error);
      setUser(null);
      handleErrors(error, navigate);
    }
  }
};

const handleErrors = (error, navigate) => {
  if (!error.response) {
    toast.error("Network Error");
    return;
  }

  const status = error.response.status;

  if (status === 401) {
    toast.error("You are not authorized. Please login.");
    navigate("/login");
  } else if (status === 404) {
    toast.error("Resource not found.");
    navigate("/");
  } else if (status === 500) {
    toast.error("Server error. Try again later.");
    navigate("/");
  } else {
    toast.error("An error occurred. Try again.");
    navigate("/");
  }
};

export default ApiCall;
