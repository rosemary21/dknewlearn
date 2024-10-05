import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

import image1 from "../../assets/images/background1.jpg";
import image2 from "../../assets/images/background2.jpg";
import image3 from "../../assets/images/background3.jpg";

const Item = ({ title, image }) => (
  <div className="container1">
    <img src={image} alt="" className="slider-image" />
    <div className="overlay1">
      <h1>{title}</h1>
    </div>
  </div>
);

const items = [
  { title: "Welcome to DK Learning", image: image1 },
  { title: "The best learning platform", image: image2 },
  { title: "Start your learning journey", image: image3 },
];

export const Slider = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  const next = () => {
    setDirection(1);
    setStep((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setDirection(-1);
    setStep((prev) => (prev - 1 + items.length) % items.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    delta: 60,
  });

  useEffect(() => {
    const interval = setInterval(() => next(), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div {...handlers} className="slider-container">
      <div
        className={`slider-item ${
          direction === 1 ? "slide-left" : "slide-right"
        }`}
      >
        <Item title={items[step].title} image={items[step].image} />
      </div>
    </div>
  );
};
