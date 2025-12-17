const API_URL = {
  auth: {
    login: "/user/login",
    signup: "/user",
    users: "/user",
    forgotPassword: "/user/forgot-password",
  },
  profile: {
    current: "/user/profile/current",
    byId: "/user",
  },
  user: {
    current: "/user/current",
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
