import MovieList from "features/booking/components/MovieList";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "api/instance";
import { Pagination } from "antd";
import {
  fetchMovieCarouselAction,
  fetchMoviesAction,
} from "features/booking/action";
import Carousel from "common/components/Carousel";
import style from "./Home.module.css";

function Home() {
  const dispath = useDispatch();
  const [config, setConfig] = useState({
    currentPage: 1,
    pageSize: 8,
    totalCount: 0,
  });

  const lstCarousel = useSelector((state) => state.booking.carousel);

  const changeTotalCount = (total) => {
    setConfig({ ...config, totalCount: total });
  };

  const fecthMovies = async () => {
    dispath(fetchMoviesAction(config, changeTotalCount));
  };

  const handleChangePage = (page) => {
    setConfig({ ...config, currentPage: page });
  };

  useEffect(() => {
    fecthMovies();
  }, [config.currentPage]);
  useEffect(() => {
    dispath(fetchMovieCarouselAction());
  }, []);

  return (
    <div className={style.home} style={{ paddingBottom: 50 }}>
      <Carousel lstCarousel={lstCarousel} />
      <MovieList style={{ marginTop: 50 }} />
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 40,
        }}
        onChange={handleChangePage}
        current={config.currentPage}
        pageSize={config.pageSize}
        total={config.totalCount}
      />
    </div>
  );
}

export default Home;
