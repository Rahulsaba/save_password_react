import axiosClient from "./axios-client"

// API endpoints
export const api = {
  // Auth endpoints
  authsignup: {
    create: (data) => axiosClient?.post(`/createuser`, data),
  },
  authsignin: {
    create: (data) => axiosClient?.post(`/loginuser`, data),
  },
  authlogout: {
    create: () => axiosClient?.post(`/logoutuser`, {}),
  },
  
  // User endpoints
  notes: {

    create: (data) => axiosClient?.post("/createnotes", data),
    getAll: () => axiosClient?.get("/createnotes"),
   
  },
  socialmedia: {
    getAll: () => axiosClient?.get("/createmedia"),
    // getById: (id) => axiosClient.get(`/users/${id}`),
    create: (data) => axiosClient?.post("/createmedia", data),
    // update: (id, data) => axiosClient.put(`/users/${id}`, data),
    delete: (id) => axiosClient?.delete(`/deletemedia/${id}`),
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

