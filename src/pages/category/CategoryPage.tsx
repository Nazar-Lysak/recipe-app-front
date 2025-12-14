import { useCategories } from "../../shared/hooks/queries/useCategories";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";

import CategoriesGrid from "../../shared/components/categories-grid/CategoriesGrid";

const CategoryPage = () => {

  const categoriesQuery = useCategories();

  return (
    <div>
      {categoriesQuery.isLoading && (
        <PagePrealoader variant="transparent" />
      )}
      {categoriesQuery.isError && (
        <p>Error loading categories.</p>
      )}
      {categoriesQuery.data && (
        <CategoriesGrid categories={categoriesQuery.data.categories} />
      )}
      
    </div>
  );
};

export default CategoryPage;
