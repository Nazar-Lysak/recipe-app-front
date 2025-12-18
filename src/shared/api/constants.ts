const API_URL = {
  auth: {
    login: "/user/login",
    signup: "/user",
    users: "/user",
    forgotPassword: "/user/forgot-password",
  },
  profile: {
    current: "/user/profile/current",
    byId: (id: string) => `/user/${id}`,
    follow: (id: string) => `/user/profile/${id}/follow`,
    unfollow: (id: string) => `/user/profile/${id}/unfollow`,
    isFollowing: (id: string) => `/user/profile/${id}/is-following`,
  },
  user: {
    current: "/user/current",
  },
  categories: {
    list: "/category",
  },
  recipes: {
    byCategory: "/recipe",
    byId: (id: string) => `/recipe/${id}`,
    like: (id: string) => `/recipe/${id}/like`,
    unlike: (id: string) => `/recipe/${id}/unlike`,
  },
} as const;

export default API_URL;
