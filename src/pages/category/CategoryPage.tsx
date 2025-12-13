import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../shared/api/get-data";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";

import CategoriesGrid from "../../shared/components/categories-grid/CategoriesGrid";

const CategoryPage = () => {

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories
  });

  return (
    <div>
      <h2>Categories</h2>
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
