import axios from "axios"

// Create an axios instance with custom config
 const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL , 
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true
})

export default axiosClient
