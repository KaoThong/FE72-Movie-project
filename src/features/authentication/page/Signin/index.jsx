import React, { useState } from "react";
import style from "./style.module.css";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import FormItem from "antd/es/form/FormItem";
import instance from "api/instance";
import { useDispatch } from "react-redux";
import { fetchSignInAction, SET_PROFILE } from "features/authentication/action";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const schema = yup.object({
  taiKhoan: yup.string().required("* Please enter your account"),
  matKhau: yup
    .string()
    .required("* Please enter your password")
    .min(8, "* Password must be between 8-16 characters"),
});

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: async (values) => {
      const res = await dispatch(fetchSignInAction(values, setIsLoading));
      if (res) window.location.reload();
    },
    validationSchema: schema,
    validateOnChange: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) history.goBack("/home");
  }, []);

  return (
    <div className={style.signin}>
      <span className={style.logo}>
        <img className={style.icon} src=".././logo.ico" alt="#" />
        <span className={style.text}>CYBERMOVIE</span>
      </span>
      <div className={style.container}>
        <h2 className={style.content}>Sign in to your account!</h2>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <p className={style.loginInfo}>Username</p>
          <Input
            name="taiKhoan"
            className={style.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="abc123"
          ></Input>
          {formik.touched.taiKhoan && formik.errors.taiKhoan && (
            <p className={style.errorText}>{formik.errors.taiKhoan}</p>
          )}

          <p className={style.loginInfo}>Password</p>
          <Input
            name="matKhau"
            className={style.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            placeholder="*******"
          ></Input>
          {formik.touched.matKhau && formik.errors.matKhau && (
            <p className={style.errorText}>{formik.errors.matKhau}</p>
          )}
          <p className={style.forgotPW}>Forgot password?</p>
          <Button className={style.btn} htmlType="submit">
            Sign in
          </Button>
          <p className={style.requestSU}>
            Please! Sign up an account if your already have one!
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
