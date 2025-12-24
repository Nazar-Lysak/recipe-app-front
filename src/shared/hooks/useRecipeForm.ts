import { type Reducer } from "react";
import { nanoid } from "nanoid";

interface Ingredient {
  id: string;
  name: string;
}

interface Instruction {
  id: string;
  text: string;
}

export interface RecipeFormState {
  name: string;
  description: string;
  time: number | null;
  category: string;
  image: string | null;
  ingredients: Ingredient[];
  steps: Instruction[];
}

type RecipeFormAction =
  | { type: "SET_FIELD"; field: keyof RecipeFormState; value: any }
  | { type: "SET_IMAGE"; file: string | null }
  | { type: "REMOVE_IMAGE" }
  | { type: "ADD_INGREDIENT" }
  | { type: "UPDATE_INGREDIENT"; id: string; name: string }
  | { type: "REMOVE_INGREDIENT"; id: string }
  | { type: "REORDER_INGREDIENTS"; ingredients: Ingredient[] }
  | { type: "ADD_INSTRUCTION" }
  | { type: "UPDATE_INSTRUCTION"; id: string; text: string }
  | { type: "REMOVE_INSTRUCTION"; id: string }
  | { type: "REORDER_INSTRUCTIONS"; steps: Instruction[] }
  | { type: "RESET" };

export const initialRecipeFormState: RecipeFormState = {
  name: "",
  description: "",
  time: null,
  category: "",
  image: null,
  ingredients: [{ id: nanoid(), name: "" }],
  steps: [{ id: nanoid(), text: "" }],
};

const createInitialRecipeFormState = (): RecipeFormState => ({
  name: "",
  description: "",
  time: null,
  category: "",
  image: null,
  ingredients: [{ id: nanoid(), name: "" }],
  steps: [{ id: nanoid(), text: "" }],
});

// Helper function to create initial state from recipe data (for editing)
export const createRecipeFormStateFromData = (
  recipeData: any,
): RecipeFormState => {
  if (!recipeData) return createInitialRecipeFormState();

  return {
    name: recipeData.name || "",
    description: recipeData.description || "",
    time: recipeData.time || null,
    category: recipeData.category?.id || "",
    image: recipeData.image || null,
    ingredients: recipeData.ingredients?.map((name: string) => ({
      id: nanoid(),
      name,
    })) || [{ id: nanoid(), name: "" }],
    steps: recipeData.steps?.map((text: string) => ({
      id: nanoid(),
      text,
    })) || [{ id: nanoid(), text: "" }],
  };
};

export const recipeFormReducer: Reducer<RecipeFormState, RecipeFormAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_IMAGE":
      return { ...state, image: action.file };

    case "REMOVE_IMAGE":
      return { ...state, image: null };

    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: [...state.ingredients, { id: nanoid(), name: "" }],
      };

    case "UPDATE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.map((ing) =>
          ing.id === action.id ? { ...ing, name: action.name } : ing,
        ),
      };

    case "REMOVE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter((ing) => ing.id !== action.id),
      };

    case "REORDER_INGREDIENTS":
      return {
        ...state,
        ingredients: action.ingredients,
      };

    case "ADD_INSTRUCTION":
      return {
        ...state,
        steps: [
          ...state.steps,
          {
            id: nanoid(),
            text: "",
          },
        ],
      };

    case "UPDATE_INSTRUCTION":
      return {
        ...state,
        steps: state.steps.map((inst) =>
          inst.id === action.id ? { ...inst, text: action.text } : inst,
        ),
      };

    case "REMOVE_INSTRUCTION":
      return {
        ...state,
        steps: state.steps.filter((inst) => inst.id !== action.id),
      };

    case "REORDER_INSTRUCTIONS":
      return {
        ...state,
        steps: action.steps,
      };

    case "RESET":
      return createInitialRecipeFormState();

    default:
      return state;
  }
};
