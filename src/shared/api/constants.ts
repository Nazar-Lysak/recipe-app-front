const API_URL = {
  auth: {
    login: "/user/login",
    signup: "/user",
    users: "/user",
    forgotPassword: "/user/forgot-password",
  },
  user: {
    current: "/user/current",
    byId: "/user",
  },
  categories: {
    list: "/category",
  },
  recipes: {
    byCategory: "/recipe",
    byId: "/recipe",
  },
} as const;

export default API_URL;
