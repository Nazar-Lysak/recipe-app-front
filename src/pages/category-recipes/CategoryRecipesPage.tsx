import { useParams } from "react-router-dom";
import { useCategories } from "../../shared/hooks/queries/useCategories";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";

const CategoryRecipesPage = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const categoriesQuery = useCategories();

    const category = categoriesQuery.data?.categories.find(
        (cat) => cat.id === categoryId
    );

    return (
        <div>
            {categoriesQuery.isLoading && (
                <PagePrealoader variant="transparent" />
            )}
            {categoriesQuery.isError && (
                <p>Error loading categories.</p>
            )}
            {categoriesQuery.data && (
                <h2>{category?.name}</h2>
            )}

        </div>
    );
};

export default CategoryRecipesPage;