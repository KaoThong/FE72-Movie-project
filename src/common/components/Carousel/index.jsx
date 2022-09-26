import React from "react";
import { dispatch, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Slider from "react-slick";
import { fetchMovieCarouselAction } from "features/booking/action";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.css";
import MovieItem from "features/booking/components/MovieItem";

function Carousel(props) {
  const lstCarousel = props.lstCarousel;
  //console.log("CPN CR", lstCarousel);

  const renderCarousel = () => {
    return lstCarousel.map((item, index) => {
      return (
        <div>
          <img style={{ width: "100%", height: "800px" }} src={item.hinhAnh} alt="Carousel" />
        </div>
      );
    });
  };

  var settings = {
   
    infinite: true,
    autoplay: true,
    centered: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return <Slider {...settings}>{renderCarousel()}</Slider>;
}

export default Carousel;
