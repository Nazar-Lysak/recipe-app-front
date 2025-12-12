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
    title: "Get Inspired",
    description: "Get inspired with our daily recipe recommendations.",
    image: "/src/assets/img/onboarding/onboarding-1.jpg",
    buttonText: "Continue",
  },
  {
    id: 2,
    title: "Get An Increase Your Skills",
    description: "Learn essential cooking techniques on your own pace.",
    image: "/src/assets/img/onboarding/onboarding-2.jpg",
    buttonText: "Continue",
  },
  {
    id: 3,
    title: "Welcome",
    description:
      "Find the best recipes that the world can provide you also with good community to increase your cooking skills",
    image: "/src/assets/img/onboarding/onboarding-3.jpg",
    buttonText: "I'm New",
    secondaryButton: "I've Been Here",
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
