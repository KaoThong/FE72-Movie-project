import { Button, Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";

import { Tabs } from "antd";

import ReactPlayer from "react-player";

import { formatDate } from "common/utils/date";
import {
  fetchCinemasAction,
  fetchMovieDetailAction,
  fetchMovieScheduleAction,
} from "features/booking/action";
import { useState } from "react";
import styles from "./Detail.module.css";
import Column from "antd/lib/table/Column";

const { TabPane } = Tabs;

function Detail() {
  // 1. lên url lấy mã phim xuống
  // 2. viết async action fetchMovieAction
  // 3. dispatch async action
  // 4. lên store, tạo thêm dữ liệu mới, xử lý action
  // 5. lấy selectedMovie và hiện ra màn hình
  const dispatch = useDispatch();
  const [cinemaSelect, setCinemaSelect] = useState("BHDStar");

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
  // console.log(movieDetail);

  // TAB
  const [tabPosition, setTabPosition] = useState("left");

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  return (
    <div className={styles.detail}>
      <div
        className={styles.container}
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        <div className={styles.item}>
          <h1
            style={{
              textAlign: "center",
              fontSize: 40,
              color: "#f73c24",
              fontSieze: 26,
              fontWeight: 700,
              fontFamily: "Gill Sans",
            }}
          >
            Detail
          </h1>
          <div style={{ display: "flex", marginTop: 40 }}>
            <div style={{ width: 600 }}>
              <img
                src={movieDetail.hinhAnh}
                style={{ width: 400, height: "100%", borderRadius: 5 }}
                alt=""
              />
            </div>
            <div
              style={{
                width: 800,
              }}
            >
              <div
                style={{
                  height: 192,
                  backgroundColor: "black",
                  color: "#f5f5f5",
                  borderRadius: 5,
                  opacity: 0.5,
                  padding: 5,
                }}
              >
                <h3 style={{ fontWeight: 600, fontSize: 18, color: "#f5f5f5" }}>
                  Tên phim: {movieDetail.tenPhim}
                </h3>
                <p style={{ fontSize: 16, marginBottom: 30, fontWeight: 400 }}>
                  Mô tả: {movieDetail.moTa}
                </p>
              </div>
              <a
                href="#schedule"
                className={styles.booking}
                style={{ fontSize: 16 }}
              >
                Đặt vé
              </a>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>Trailer:</h3>

                <ReactPlayer
                  controls
                  url={movieDetail?.trailer}
                  style={{ position: "relative", bottom: 0, right: 0 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div id="schedule" className={styles.schedule}>
          <div
            className={styles.tabpane}
            style={{
              width: 1100,
              height: 700,
              marginTop: 30,
              marginBottom: 20,
              backgroundColor: "#515151",
              borderRadius: 5,
            }}
          >
            <Tabs
              tabPosition="left"
              centered
              defaultActiveKey="1"
              onChange={(e) => fetchMovieSchedule(e)}
            >
              {cinemas?.map((item, index) => {
                return (
                  <TabPane
                    key={item.maHeThongRap}
                    tab={
                      <img
                        style={{ width: 60, marginTop: 20 }}
                        src={item.logo}
                        alt=""
                      />
                    }
                  >
                    {schedule?.lstCumRap?.map((item, index) => {
                      const currentMovie = item.danhSachPhim.find(
                        (movie) => movie.maPhim.toString() === movieId
                      );

                      if (!currentMovie) return null;
                      console.log(currentMovie?.lstLichChieuTheoPhim);

                      return (
                        <Card
                          key={index}
                          style={{
                            margin: 20,
                            backgroundColor: "#6a6969",
                            color: "#f5f5f5",
                            borderRadius: 5,
                          }}
                        >
                          <img
                            style={{ width: 80, height: 80 }}
                            src={item.hinhAnh}
                          />
                          <p style={{ fontWeight: 500, color: "#f5f5f5" }}>
                            {item.tenCumRap}
                          </p>
                          {/* List các xuất chiếu */}
                          {currentMovie?.lstLichChieuTheoPhim?.map(
                            (show, index) => {
                              return (
                                <NavLink
                                  to={`/booking/${show?.maLichChieu}`}
                                  key={index}
                                  type="default"
                                  style={{
                                    marginRight: 10,
                                    marginBottom: 5,
                                    display: "inline-block",
                                    color: "#f5f5f5",
                                    fontWeight: "500",
                                    backgroundColor: "#f73c24",
                                    borderRadius: 5,
                                  }}
                                >
                                  {formatDate(show.ngayChieuGioChieu)}
                                </NavLink>
                              );
                            }
                          )}
                        </Card>
                      );
                    })}
                  </TabPane>
                );
              })}
            </Tabs>
          </div>
        </div>

        {/* Movie thearter system */}
      </div>
    </div>
  );
}

export default Detail;
