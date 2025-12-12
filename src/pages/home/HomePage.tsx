import BottomNavigation from "../../shared/components/bottom-navigation/BottomNavigation";
import WellcomeHeader from "../../shared/components/headers/header/Header";


const HomePage = () => {
  return (
    <div>
      <header>
          <WellcomeHeader />
          
      </header>
      <div className="div">
          Content
      </div>

      <BottomNavigation />        
    </div>
  )
};

export default HomePage;