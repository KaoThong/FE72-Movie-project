import React from "react";
import styles from "./style.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROFILE } from "features/authentication/action";
import MovieList from "features/booking/components/MovieList";

function Header() {
  const history = useHistory();
  const userProfile = JSON.parse(localStorage.getItem("userInfo"));

  const goToHome = () => {
    history.push("/");
  };

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    dispatch({
      type: SET_PROFILE,
      payload: null,
    });
    window.location.reload();
    goToHome();
  };

  const renderUserInfo = () => {
    if (userProfile) {
      return (
        <>
          <NavLink activeClassName={styles.active} to="/" exact>
            <i class="fa-regular fa-user"></i> {userProfile.hoTen}
          </NavLink>
          <a className={styles.looOut} href="#" onClick={handleLogout}>
            <button className={styles.btn}>
              Log out <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </a>
        </>
      );
    }
    return (
      <>
        <NavLink activeClassName={styles.active} to="/signin">
          <i
            style={{ fontSize: 20 }}
            className={styles.icon}
            class="fa-regular fa-user"
          ></i>
        </NavLink>
        <NavLink
          style={{ fontSize: 16, fontWeight: 500 }}
          activeClassName={styles.active}
          to="/signup"
        >
          Sign up
        </NavLink>
      </>
    );
  };

  return (
    <div className={styles.header}>
      <span onClick={goToHome} className={styles.logo}>
        <img className={styles.icon} src=".././logo.ico" alt="#" />
        <span className={styles.title}>CYBERMOVIE</span>
      </span>
      <div className={styles.featured}>
        <a href="#movieList" className={styles.item}>
          Lịch chiếu
        </a>
        <a className={styles.item}>Cụm rạp</a>
        <a className={styles.item}>Tin tức</a>
      </div>
      <nav className={styles.navbar}>
        {/* <NavLink activeClassName={styles.active} to="/" exact>
          Home
        </NavLink> */}

        {renderUserInfo()}
      </nav>
    </div>
  );
}

export default Header;
