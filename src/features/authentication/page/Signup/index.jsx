import React from "react";
import { Input, Button } from "antd";
import style from "./style.module.css";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import instance from "api/instance";
import { useHistory } from "react-router-dom";

const schema = yup.object({
  taiKhoan: yup.string().required("* Vui lòng nhập tài khoản"),
  hoTen: yup
    .string()
    .required("* Vui lòng nhập họ tên")
    .matches(/^[A-za-z ]+$/g, "* Vui lòng nhập chữ"),
  matKhau: yup
    .string()
    .required("* Vui lòng nhập mật khẩu")
    .min(8, "* Mật khẩu phải từ 8 - 16 kí tự"),
  email: yup
    .string()
    .required("* Vui lòng nhập email")
    .email("* Email không đúng định dạng"),
  soDt: yup
    .string()
    .required("* Vui lòng nhập số điện thoại")
    .matches(/(84|0)+([0-9]{9})\b/, "* Số điện thoại không đúng định dạng"),
});

function Signup() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
    },
    onSubmit: (values) => {
      const newUser = { ...values, maNhom: "GP02" };
      signUp(newUser);
    },
    validationSchema: schema,
    validateOnChange: false,
  });

  const signUp = async (user) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangKy",
        method: "POST",
        data: user,
      });
      console.log(res.data);
      history.push("/signin");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(formik.errors);

  return (
    <div className={style.container}>
      <h2 className={style.content}>Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={style.title}
          type="text"
          placeholder="Username"
        ></Input>
        {formik.touched.taiKhoan && formik.errors.taiKhoan && (
          <p className={style.errorText}>{formik.errors.taiKhoan}</p>
        )}

        <Input
          name="hoTen"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={style.title}
          type="text"
          placeholder="Fullname"
        ></Input>
        {formik.touched.hoTen && formik.errors.hoTen && (
          <p className={style.errorText}>{formik.errors.hoTen}</p>
        )}

        <Input
          name="matKhau"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={style.title}
          type="password"
          placeholder="Password"
        ></Input>
        {formik.touched.matKhau && formik.errors.matKhau && (
          <p className={style.errorText}>{formik.errors.matKhau}</p>
        )}

        <Input
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={style.title}
          type="email"
          placeholder="Email"
        ></Input>
        {formik.touched.email && formik.errors.email && (
          <p className={style.errorText}>{formik.errors.email}</p>
        )}

        <Input
          name="soDt"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={style.title}
          type="text"
          placeholder="Phone number"
        ></Input>
        {formik.touched.soDt && formik.errors.soDt && (
          <p className={style.errorText}>{formik.errors.soDt}</p>
        )}

        <Button className={style.btn} type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Signup;
