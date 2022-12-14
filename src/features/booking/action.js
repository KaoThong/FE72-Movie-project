import instance from "api/instance";

export const SET_MOVIES = "booking/SET_MOVIES";
export const DETAIL_MOVIES = "booking/DETAIL_MOVIES";
export const SET_CINEMAS = "booking/SET_SELECTED_MOVIES";
export const SET_SCHEDULE = "booking/SET_SCHEDULE";
export const SET_CAROUSEL = "booking/SET_CAROUSEL";
export const SET_SEAT = "booking/SET_SEAT";

// async action
export const fetchMoviesAction = (config, cb) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
        method: "GET",
        params: {
          maNhom: "GP02",
          soTrang: config.currentPage,
          soPhanTuTrenTrang: config.pageSize,
        },
      });
      cb(res.data.content.totalCount);

      dispatch({
        type: SET_MOVIES,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const fetchMovieDetailAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayThongTinPhim",
        method: "GET",
        params: {
          MaPhim: movieId,
        },
      });

      dispatch({
        type: DETAIL_MOVIES,
        payload: res.data.content,
      });
      // console.log(res.data.content);
    } catch (err) {}
  };
};

export const fetchCinemasAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });

    dispatch({
      type: SET_CINEMAS,
      payload: res.data.content,
    });

    return res.data.content;
  } catch (err) {}
};

export const fetchMovieScheduleAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
        method: "GET",
        params: {
          maHeThongRap: id,
          maNhom: "GP02",
        },
      });

      dispatch({
        type: SET_SCHEDULE,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const fetchMovieCarouselAction = () => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachBanner",
        method: "GET",
      });
      dispatch({
        type: SET_CAROUSEL,
        payload: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchMoiveSeatAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyDatVe/LayDanhSachPhongVe",
        method: "GET",
        params: {
          maLichChieu: id,
        },
      });
      console.log(res.data.content);
      dispatch({
        type: SET_SEAT,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};
