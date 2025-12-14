export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Recipe {
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
  author: User;
  category: Category;
  createdAt: string;
  updatedAt: string;
}
