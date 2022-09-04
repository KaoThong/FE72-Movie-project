import instance from "api/instance";

export const SET_PROFILE = "auth/SET_PROFILE";

export const fetchSignInACtion = (user, setIsLoading) => {
  return async (dispatch) => {
    try {
      setIsLoading(true);

      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });

      const profile = {...res.data.content};
      delete profile.accessToken;

      localStorage.setItem("token", res.data.content.accessToken);

      dispatch({
        type: SET_PROFILE,
        payload: {...profile},
      });

      return {...profile};
    } catch(error) {
        console.log(error);
    }
    finally {
        setIsLoading(false);
    }
  }
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
}
