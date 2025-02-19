import axios from "axios";

const $axios = axios.create({
  // baseURL:"http://localhost:3000", 

  baseURL:"https://purohit-backend.onrender.com", 
});

// Add a request interceptor
$axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log("i reachered here")
  const accessToken = localStorage.getItem("token_id");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log(`🔗 Final URL: ${config.baseURL}${config.url}`);
  console.log(`📜 Headers:`, config.headers)
  return config;
});

export default $axios;