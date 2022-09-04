import instance from "api/instance";
import React from "react";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Card, Button } from "antd";
import {
  fetchCinemasAction,
  fetchMovieDetailAction,
  fetchMovieScheduleAction,
} from "features/booking/action";
import { formatDate } from "common/utils/date";

function Detail() {
  // 1. lên url lấy mã phim xuống
  // 2. viết async action fetchMovieAction
  // 3. dispatch async action
  // 4. lên store, tạo thêm dữ liệu mới, xử lý action
  // 5. lấy selectedMovie và hiện ra màn hình
  const dispatch = useDispatch();

  const match = useRouteMatch();
  const movieId = match.params.id;
  const cinemas = useSelector((state) => state.booking.cinemas);

  const fetchMovieDetail = () => {
    dispatch(fetchMovieDetailAction(movieId));
  };

  const fetchCinemas = async () => {
    const data = await dispatch(fetchCinemasAction);
    fetchMovieSchedule(data[0].maHeThongRap);
  };

  const fetchMovieSchedule = (id) => {
    dispatch(fetchMovieScheduleAction(id));
  };

  const schedule = useSelector((state) => {
    return state.booking.schedule;
  });

  useEffect(() => {
    fetchMovieDetail();
    fetchCinemas();
  }, []);

  const movieDetail = useSelector((state) => state.booking.selectedMovie);
  console.log(movieDetail);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: 40 }}>Thông tin phim</h1>
      <div style={{ display: "flex", marginLeft: 20, marginTop: 40 }}>
        <div style={{ width: 650 }}>
          <img src={movieDetail.hinhAnh} style={{ width: 500 }} alt="" />
        </div>
        <div style={{ width: 700 }}>
          <h3 style={{ fontWeight: 600, fontSize: 20 }}>
            Tên phim: {movieDetail.tenPhim}
          </h3>
          <p style={{ fontSize: 18, marginBottom: 30, fontWeight: 400 }}>
            Mô tả: {movieDetail.moTa}
          </p>
          <h3 style={{ fontWeight: 600 }}>Trailer:</h3>

          {movieDetail?.trailer?.startsWith("https") && (
            <iframe
              src={movieDetail?.trailer}
              style={{ width: 700, height: 450 }}
              frameBorder="0"
            >
              {" "}
              Trailer:
            </iframe>
          )}

          <div>
            {cinemas?.map((item) => {
              return (
                <img
                  style={{ width: 100, marginTop: 20, marginRight: 16 }}
                  src={item.logo}
                />
              );
            })}
          </div>
        </div>
      </div>

      {schedule?.lstCumRap?.map((item) => {
        const currentMovie = item.danhSachPhim.find(
          (movie) => movie.maPhim.toString() === movieId
        );

        if (!currentMovie) return null;
        console.log(currentMovie?.lstLichChieuTheoPhim);

        return (
          <Card
            style={{ margin: 20, backgroundColor: "black", color: "white" }}
          >
            <img src={item.hinhAnh} />
            <p>{item.tenCumRap}</p>
            {/* List các xuất chiếu */}
            {currentMovie?.lstLichChieuTheoPhim?.map((show) => {
              return (
                <Button type="default" style={{ marginRight: 10 }}>
                  {formatDate(show.ngayChieuGioChieu)}
                </Button>
              );
            })}
          </Card>
        );
      })}
    </div>
  );
}

export default Detail;
