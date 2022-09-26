import instance from "api/instance";

export const SET_PROFILE = "auth/SET_PROFILE";
export const DEL_PROFILE = "auth/DEL_PROFILE";

const token = localStorage.getItem("token");

export const fetchSignInAction = (user, setIsLoading) => {
  return async (dispatch) => {
    try {
      setIsLoading(true);

      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });

      const profile = { ...res.data.content };
      delete profile.accessToken;

      localStorage.setItem("token", res.data.content.accessToken);
      localStorage.setItem("userInfo", JSON.stringify(profile));

      dispatch({
        type: SET_PROFILE,
        payload: { ...profile },
      });

      return { ...profile };
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
};

export const fetchProfileAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      method: "POST",
    });

    dispatch({
      type: SET_PROFILE,
      payload: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
};

export const logoutAction = async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  dispatch({
    type: DEL_PROFILE,
  });
};

export const bookingSeatAction = (data, setIsLoading) => {
  return async (dispatch) => {
    try {
      setIsLoading(true);

      const res = await instance.request({
        url: "/api/QuanLyDatVe/DatVe",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
};
