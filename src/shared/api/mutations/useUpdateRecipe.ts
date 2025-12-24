import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecipe } from '../put-data';
import { useSession } from '../../../context/useSession';
import type { RecipeFormState } from '../../hooks/useRecipeForm';

export const useUpdateRecipe = (recipeId: string) => {
  const queryClient = useQueryClient();
  const { token } = useSession();

  return useMutation({
    mutationFn: async (formState: RecipeFormState) => {
      if (!token) {
        throw new Error('No authentication token');
      }

      const preparedData = {
        name: formState.name,
        description: formState.description,
        time: formState.time,
        category: formState.category,
        image: formState.image,
        ingredients: formState.ingredients.map((ing) => ing.name),
        steps: formState.steps.map((step) => step.text),
      };

      return updateRecipe(recipeId, preparedData, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['recipe', recipeId] });
    },
  });
};
