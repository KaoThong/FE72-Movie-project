import React from "react";
import styles from "./style.module.css";
import bhd from "../../../assets/img/bhd-star-cineplex.png";
import cgv from "../../../assets/img/cgv.png";
import cinestar from "../../../assets/img/cinestar.png";
import galaxy from "../../../assets/img/galaxy-cinema.png";
import lotte from "../../../assets/img/lotte-cinema.png";
import mega from "../../../assets/img/megags.png";
import touch from "../../../assets/img/touch.png";
import starlight from "../../../assets/img/starlight.png";
import ddc from "../../../assets/img/ddc.png";
import cinemax from "../../../assets/img/cinemax.jpeg";
import zalo from "../../../assets/img/zalo.png";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer_top}>
          <div className={styles.col}>
            <p>TIX</p>
            <div className={styles.row}>
              <div className={styles.col_left}>
                <a href="#">FAQ</a>
                <a href="#">Brand Guidelines</a>
              </div>
              <div className={styles.col_right}>
                <a href="#">Thỏa thuận sử dụng</a>
                <a href="#">Chính sách bảo mật</a>
              </div>
            </div>
          </div>
          <div className={styles.col}>
            <p>ĐỐI TÁC</p>
            <div className={styles.cinemas}>
              <div className={styles.cinema}>
                <img src={bhd} alt="#" />
              </div>
              <div className={styles.cinema}>
                <img src={cgv} alt="#" />
              </div>
              <div className={styles.cinema}>
                <img src={cinestar} alt="#" />
              </div>
              <div className={styles.cinema}>
                <img src={galaxy} alt="#" />
              </div>
              <div className={styles.cinema}>
                <img src={lotte} alt="#" />
              </div>
            </div>
            <div className={styles.cinemas}>
              <div className={styles.cinema}>
                <img src={touch} alt="#" />
              </div>

              <div className={styles.cinema}>
                <img src={starlight} alt="#" />
              </div>

              <div className={styles.cinema}>
                <img src={ddc} alt="#" />
              </div>

              <div className={styles.cinema}>
                <img src={cinemax} alt="#" />
              </div>

              <div className={styles.cinema}>
                <img src={zalo} alt="#" />
              </div>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.row}>
              <div className={styles.col_left}>
                <p>MOBILE APP</p>
                <i className="fa-brands fa-apple"></i>
                <i className="fa-brands fa-android"></i>
              </div>
              <div className={styles.col_right}>
                <p>SOCIAL</p>
                <i className="fa-brands fa-square-facebook"></i>
                <i className="fa-brands fa-square-twitter"></i>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer_bot}>
          <div className={styles.container}>
            <span>CYBERMOVIE - SẢN PHẨM CỦA CÔNG TY CỔ PHẦN CYBERACADEMY</span>
            <p>
                Địa chỉ: 02 đường Lê Đức Thọ, Phường 7, Quận Gò Vấp, Tp.Hồ Chí Minh, Việt Nam.
            </p>
            <p>
            Giấy chứng nhận đăng ký kinh doanh số: 090912999, đăng ký thay đổi lần thứ 12, ngày 22 tháng 01 năm 2022 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </p>
            <p>
                Số điện thoại (Hotline): 1900 912 912
            </p>
            <p>
                Email: support@cybermovie.vn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
