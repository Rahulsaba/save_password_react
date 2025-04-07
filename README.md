// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or elsewhere
    const token = localStorage.getItem("token")

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx
    return response
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    // Handle other errors
    return Promise.reject(error)
  },
)