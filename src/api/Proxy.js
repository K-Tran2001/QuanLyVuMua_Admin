import axios from "axios";
import { getItemLocalStore } from "../hooks/useLocalStore";

export const Proxy = async (method, api, request, isUseToken = true) => {
  const user = getItemLocalStore("^token")
  const config = {
    ...(isUseToken && {
      headers: { Authorization: `Bearer ${user?.accessToken}` },
    }),
  };
  let result ={}
  try {
    if (method.toLowerCase() === "get") {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+api);
      result.success = response.data?.success;
      result.data = response?.data?.data;
    } else if (method.toLowerCase() === "post") {
      
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+api, request || {},config);
      
      result.success = response.data?.success;
      result.data = response?.data?.data;
      result.metaData = response?.data?.metaData;
    } else if (method.toLowerCase() === "post_multi") {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+api, request, {
        headers: { "Content-Type": "multipart/form-data" },
      } || {},config);
      
      result.success = response.data?.success;
      result.data = response?.data?.data;
    }
    else if (method.toLowerCase() === "put") {
      const response = await axios.put(import.meta.env.VITE_BACKEND_URL+api, request || {},config);
      result.success = response.data?.success;
      result.data = response?.data?.data;
    }
    else{
      const response = await axios.delete(import.meta.env.VITE_BACKEND_URL+api, request || {},config);
      result.success = response.data?.success;
      result.data = response?.data?.data;
    }
  } catch (err) {
    result.message = err;
  }
  return result;
};