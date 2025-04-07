import axiosClient from "./axios-client"

// API endpoints
export const api = {
  // User endpoints
  socialmedia: {
    getAll: () => axiosClient?.get("api/createmedia"),
    // getById: (id) => axiosClient.get(`/users/${id}`),
     create: (data) =>  axiosClient.post("api/createmedia", data),
    // update: (id, data) => axiosClient.put(`/users/${id}`, data),
    delete: (id) => axiosClient.delete(`api/deletemedia/${id}`),
  },

  // Post endpoints
//   posts: {
//     getAll: () => axiosClient.get("/posts"),
//     getById: (id) => axiosClient.get(`/posts/${id}`),
//     getByUser: (userId) => axiosClient.get(`/users/${userId}/posts`),
//     create: (data) => axiosClient.post("/posts", data),
//     update: (id, data) => axiosClient.put(`/posts/${id}`, data),
//     delete: (id) => axiosClient.delete(`/posts/${id}`),
//   },
}

