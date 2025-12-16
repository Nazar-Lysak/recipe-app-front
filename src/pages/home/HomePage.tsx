import MyRecipesGallery from "../../shared/components/my-recipes-gallery/MyRecipesGallery";
import NewestRecipesGallery from "../../shared/components/newest-recipes-gallery/NewestRecipesGallery";
import TopChef from "../../shared/components/top-chef/TopChef";

const HomePage = () => {
  return (
    <>
      <NewestRecipesGallery />
      <TopChef />
      <MyRecipesGallery />
    </>
  );
};

export default HomePage;
