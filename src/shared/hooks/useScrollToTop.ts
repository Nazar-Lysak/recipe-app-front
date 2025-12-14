import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const scrollableElements = document.querySelectorAll('[style*="overflow"]');
    scrollableElements.forEach((element) => {
      element.scrollTop = 0;
    });
    
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, [pathname]);
};
