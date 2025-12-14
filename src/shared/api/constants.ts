const API_URL = {
  auth: {
    login: "/user/login",
    signup: "/user",
    users: "/user",
    forgotPassword: "/user/forgot-password",
  },
  user: {
    current: "/user/current",
  },
  categories: {
    list: "/category",
  },
  recipes: {
    byCategory: "/recipe",
  },
} as const;

export default API_URL;
