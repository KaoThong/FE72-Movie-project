import React, { useState } from "react";
import style from "./style.module.css";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import FormItem from "antd/es/form/FormItem";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { fetchSignInACtion, SET_PROFILE } from "features/authentication/action";


const schema = yup.object({
  taiKhoan: yup.string().required("* Vui lòng nhập tài khoản"),
  matKhau: yup
    .string()
    .required("* Vui lòng nhập mật khẩu")
    .min(8, "* Mật khẩu phải từ 8 - 16 kí tự"),
});

function Signin() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: async (values) => {
      const res = await dispatch(fetchSignInACtion(values, setIsLoading));
    },
    validationSchema: schema,
    validateOnChange: false,
  });

  // const signIn = async (user) => {
  //   try {
  //     // setIsLoading(true);
  //     const res = await instance.request({
  //       url: "/api/QuanLyNguoiDung/DangNhap",
  //       method: "POST",
  //       data: user,
  //     });

  //     localStorage.setItem("token", res.data.content.accessToken);
  //     dispatch({type: SET_PROFILE, payload: res.data.content})
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   } 
  //   // finally {
  //   //   setIsLoading(false);
  //   // }
  // };

  return (
    <div className={style.container}>
      <h2 className={style.content}>Sign In</h2>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <Input
          name="taiKhoan"
          className={style.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          placeholder="Username"
        ></Input>
        {formik.touched.taiKhoan && formik.errors.taiKhoan && (
          <p className={style.errorText}>{formik.errors.taiKhoan}</p>
        )}

        <Input
          name="matKhau"
          className={style.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          placeholder="Password"
        ></Input>
        {formik.touched.matKhau && formik.errors.matKhau && (
          <p className={style.errorText}>{formik.errors.matKhau}</p>
        )}

        <Button className={style.btn} type="primary" htmlType="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default Signin;
