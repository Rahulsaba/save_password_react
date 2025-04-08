import axios from "axios"

// Create an axios instance with custom config
 const axiosClient = axios.create({
  baseURL: import.meta.env.BASE_URL , 
  headers: {
    "Content-Type": "application/json",
  },
})



export default axiosClient
