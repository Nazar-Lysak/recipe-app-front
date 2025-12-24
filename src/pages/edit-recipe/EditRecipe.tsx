import { useReducer, useMemo } from "react";
import { useTranslation } from "react-i18next";
import CreateRecipeForm from "../../shared/components/forms/create-recipe/CreateRecipeForm";
import {
  createRecipeFormStateFromData,
  recipeFormReducer,
} from "../../shared/hooks/useRecipeForm";
import { useParams } from "react-router";
import { useRecipe } from "../../shared/hooks/queries/useRecipe";

const EditRecipe = () => {
  const { t: tCommon } = useTranslation("common");
  const recipeId = useParams<{ recipeId: string }>().recipeId;
  const { data: recipeData, isLoading } = useRecipe(recipeId || "");

  const initialState = useMemo(
    () => createRecipeFormStateFromData(recipeData),
    [recipeData],
  );

  const [formState, dispatch] = useReducer(recipeFormReducer, initialState);

  if (isLoading) {
    return <div>{tCommon("loading")}</div>;
  }

  return <CreateRecipeForm formState={formState} dispatch={dispatch} />;
};

export default EditRecipe;
