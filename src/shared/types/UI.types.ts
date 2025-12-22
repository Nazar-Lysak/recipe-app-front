export interface UserInterface {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  avatar_url?: string | null;
  // liked_recipes?: string[];
  profile?: FullUserDataInterface;
}

export interface CategoryInterface {
  id: string;
  name: string;
  image: string;
}

export interface RecipeInterface {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  time: number;
  ingredients: string[];
  steps: string[];
  video: string;
  favouriteCount: number;
  authorId: string;
  author: UserInterface;
  category: CategoryInterface;
  createdAt: string;
  updatedAt: string;
  likedByUserIds: string[];
  averageRating?: number;
  reviewsCount?: number;
  reviews?: ReviewInterface[];
}

export interface ReviewInterface {
  comment: string;
  createdAt: Date;
  id: string;
  imgage: string | null;
  rating: number;
  recipeId: string;
  userId: string;
}

export interface FullUserDataInterface {
  id: string;
  username: string;
  email: string;
  first_name: string | undefined;
  last_name: string | undefined;
  bio: string | null;
  location: string | null;
  avatar_url?: string | null;
  banner_url?: string | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
  language: string;
  theme: "light" | "dark" | "ocean" | "sunset";
  is_private: boolean;
  followers_count: number;
  following_count: number;
  recipes_count: number;
  likes_received: number;
  rating: number;
  created_at: string;
  updated_at: string;
  liked_recipes: string[];
}

export type Theme = "light" | "dark" | "ocean" | "sunset";

export interface ThemeOption {
  value: Theme;
  label: string;
}

export type Language = "en" | "ua";

export interface LanguageOption {
  value: Language;
  label: string;
}
