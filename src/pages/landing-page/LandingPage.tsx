import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../shared/ui/button/Button";
import style from "./LandingPage.module.scss";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  secondaryButton?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Отримайте натхнення",
    description:
      "Отримуйте натхнення з нашими щоденними рекомендаціями рецептів.",
    image: "/assets/img/onboarding/onboarding-1.jpg",
    buttonText: "Продовжити",
  },
  {
    id: 2,
    title: "Підвищуйте свої навички",
    description: "Вивчайте основні кулінарні техніки у власному темпі.",
    image: "/assets/img/onboarding/onboarding-2.jpg",
    buttonText: "Продовжити",
  },
  {
    id: 3,
    title: "Ласкаво просимо",
    description:
      "Знайдіть найкращі рецепти, які може запропонувати світ, а також чудову спільноту для підвищення ваших кулінарних навичок",
    image: "/assets/img/onboarding/onboarding-3.jpg",
    buttonText: "Я новачок",
    secondaryButton: "Я вже тут був",
  },
];

const LandingPage: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const currentSlide = onboardingSteps[currentStep];

  return (
    <div className={style.container}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className={style.content}
        >
          <div className={style.imageContainer}>
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className={style.image}
            />
          </div>

          <div className={style.textContent}>
            <h1 className={style.title}>{currentSlide.title}</h1>
            <p className={style.description}>{currentSlide.description}</p>
          </div>

          <div className={style.pagination}>
            {onboardingSteps.map((_, index) => (
              <span
                key={index}
                className={`${style.dot} ${index === currentStep ? style.activeDot : ""}`}
              />
            ))}
          </div>

          <div className={style.actions}>
            {currentStep < onboardingSteps.length - 1 ? (
              <Button onClick={handleNext} className={style.primaryButton}>
                {currentSlide.buttonText}
              </Button>
            ) : (
              <>
                <Button onClick={handleSignup} className={style.primaryButton}>
                  {currentSlide.buttonText}
                </Button>
                {currentSlide.secondaryButton && (
                  <Button
                    onClick={handleLogin}
                    className={style.secondaryButton}
                  >
                    {currentSlide.secondaryButton}
                  </Button>
                )}
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
