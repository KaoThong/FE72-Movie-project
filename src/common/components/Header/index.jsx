import React from "react";
import styles from "./style.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROFILE } from "features/authentication/action";

function Header() {
  const history = useHistory();
  const userProfile = useSelector((state) => state.auth.profile);

  const goToHome = () => {
    history.push("/");
  };

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({
      type: SET_PROFILE,
      payload: null,
    });
    goToHome();
  }

  const renderUserInfo = () => {
    if (userProfile) {
      return (
        <>
        <NavLink activeClassName={styles.active} to="/" exact>
          Hi, {userProfile.hoTen}
        </NavLink>
        <a href="#" onClick={handleLogout}>Log out</a>
        </>
      );
    }
    return (
      <>
       <NavLink activeClassName={styles.active} to="/signin">
        Sign in
      </NavLink>
      <NavLink activeClassName={styles.active} to="/signup">
        Sign up
      </NavLink>
      </>
    );
  };

  return (
    <div className={styles.header}>
      <span onClick={goToHome} className={styles.logo}>
        CyberMovive
      </span>
      <nav className={styles.navbar}>
        <NavLink activeClassName={styles.active} to="/" exact>
          Home
        </NavLink>
        <NavLink activeClassName={styles.active} to="/movies">
          Movie
        </NavLink>

        {renderUserInfo()}
        
      </nav>
    </div>
  );
}

export default Header;
