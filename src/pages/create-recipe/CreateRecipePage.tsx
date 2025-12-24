import { useReducer } from "react";
import CreateRecipeForm from "../../shared/components/forms/create-recipe/CreateRecipeForm";
import {
  initialRecipeFormState,
  recipeFormReducer,
} from "../../shared/hooks/useRecipeForm";

const CreateRecipePage = () => {
  const [formState, dispatch] = useReducer(
    recipeFormReducer,
    initialRecipeFormState,
  );

  return <CreateRecipeForm formState={formState} dispatch={dispatch} />;
};

export default CreateRecipePage;
