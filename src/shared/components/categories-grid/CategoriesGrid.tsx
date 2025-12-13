import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import CategoryCard from "../../ui/category-card/CategoryCard";
import style from "./CategoriesGrid.module.scss";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoriesGridProps {
  categories: Category[];
}

const animation = (index: number) => {
  return {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 },
    whileHover: { scale: 1.02, transition: { duration: 0.2 } },
    transition: {
      delay: index * 0.05,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  };
};

const CategoriesGrid = ({categories}: CategoriesGridProps) => {

    return (
        <ul className={style.list}>
            <AnimatePresence>
                {categories.map((category, index) => (
                    <motion.li 
                        {...animation(index)}
                        key={category.id}
                    >
                        <Link to={`/categories/${category.id}`}>
                        <CategoryCard name={category.name} image={category.image} /> 
                        </Link>
                    </motion.li>
                ))}
            </AnimatePresence>
            
        </ul>
    )
}

export default CategoriesGrid;