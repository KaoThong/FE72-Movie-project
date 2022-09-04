import MovieList from "features/booking/components/MovieList";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import instance from "api/instance";
import { Pagination } from "antd";
import { fetchMoviesAction } from "features/booking/action";

function Home() {
  const dispath = useDispatch();
  const [config, setConfig] = useState({
    currentPage: 1,
    pageSize: 8,
    totalCount: 0,
  });

  const changeTotalCount = (total) => {
    setConfig({...config, totalCount: total});
  }

  const fecthMovies = async () => {
    dispath(fetchMoviesAction(config, changeTotalCount) )
  };

  const handleChangePage = (page) => {
    setConfig({ ...config, currentPage: page });
  };

  useEffect(() => {
    fecthMovies();
  }, [config.currentPage]);
console.log(config);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: 40 }}>Danh sách phim</h1>
      <MovieList />
      <Pagination
      style={{display:"flex", justifyContent: "center", marginTop: 40}}
        onChange={handleChangePage}
        current={config.currentPage}
        pageSize={config.pageSize}
        total={config.totalCount}
      />
    </div>
  );
}

export default Home;
