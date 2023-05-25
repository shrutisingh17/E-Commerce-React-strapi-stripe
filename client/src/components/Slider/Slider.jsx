import React, { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // const data = [
  //   "https://unsplash.com/photos/_3Q3tsJ01nc",
  //   "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  // ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider">
      <div className="container" style={{transform:`translateX(-${currentSlide * 100}vw)`}}>
        <img src="/img/cover1.jpg" alt="" />
        <img src="/img/cover2.jpeg" alt="" />
        <img src="/img/cover3.jpg" alt="" />

      </div>
      <div className="icons">
        <div className="icon one" onClick={prevSlide}>
          <ArrowBackIosNewIcon />
        </div>
        <div className="icon two" onClick={nextSlide}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;