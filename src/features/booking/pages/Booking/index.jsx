import { fetchMoiveSeatAction } from "features/booking/action";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./style.module.css";
import { Button } from "antd";
import { bookingSeatAction } from "features/authentication/action";

function Booking() {
  const history = useHistory();
  const match = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);
  const scheduleId = match.params.id;
  const dispatch = useDispatch();
  const [selectedSeat, setSelectedSeat] = useState([]);
  console.log(selectedSeat);
  const { lstSeat } = useSelector((state) => state.booking);
  const [Sum, setSum] = useState(0);
  let b = 0;

  const handleBookSeat = async () => {
    const danhSachVe = [];
    selectedSeat.forEach((item) => {
      danhSachVe.push({ maGhe: item.maGhe, giaVe: item.giaVe });
    });
    const data = {
      maLichChieu: scheduleId,
      danhSachVe: danhSachVe,
    };
    const res = await dispatch(bookingSeatAction(data, setIsLoading));
    if (res.statusCode === 200) {
      alert(res.content);
      history.push("/");
    } else {
      alert(res.content);
    }
  };

  const fetchMoiveSeat = () => {
    dispatch(fetchMoiveSeatAction(scheduleId));
  };
  const handleSelSeat = (seat) => {
    console.log(seat);
    const foundIndex = selectedSeat.findIndex(
      (item) => item.maGhe === seat.maGhe
    );
    if (foundIndex === -1) {
      setSelectedSeat((prev) => [...prev, seat]);
    } else {
      let newSel = [...selectedSeat];
      newSel.splice(foundIndex, 1);
      setSelectedSeat(newSel);
    }
    for (var i = 0; i < selectedSeat.length; i++) {
      b += selectedSeat[i].giaVe;
    }
    setSum(b + 90000);
  };

  useEffect(() => {
    fetchMoiveSeat();
    const token = localStorage.getItem("token");
    if (!token) history.push("/signin");
  }, []);

  return (
    <div className={styles.background} style={{ paddingTop: 100 }}>
      <div className={styles.booking} style={{ marginBottom: 50 }}>
        <div className={styles.cinema}>
          <div className={styles.light}>
            <h1 style={{ color: "#f5f5f5" }}>MÀN HÌNH</h1>
            <div style={{ marginTop: 60 }}>
              {lstSeat.danhSachGhe?.map((seat, index) => {
                return (
                  <Fragment>
                    <button
                      style={{
                        width: 47,
                        height: 40,
                        textAlign: "center",
                        margin: "5px",
                        backgroundColor: "#fa5238",
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        background:
                          seat.loaiGhe === "Vip"
                            ? "orange"
                            : seat.daDat
                            ? "red"
                            : "grey",
                      }}
                      key={index}
                      disabled={seat.daDat ? true : false}
                      onClick={() => handleSelSeat(seat)}
                    >
                      {seat.daDat ? "X" : seat.stt}
                    </button>
                    {(index + 1) % 16 === 0 ? <br /> : " "}
                  </Fragment>
                );
              })}
            </div>
            <div style={{ lineHeight: "30px" }}>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "end",
                }}
              >
                <p
                  style={{
                    width: 37,
                    height: 30,
                    backgroundColor: "grey",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    marginRight: 10,
                    border: "1px solid black",
                    marginBottom: 10,
                  }}
                ></p>
                <p
                  style={{
                    textAlign: "bottom",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  : Ghế chưa đặt
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "end",
                }}
              >
                <p
                  style={{
                    width: 37,
                    height: 30,
                    backgroundColor: "#fa5238",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    marginRight: 10,
                    border: "1px solid black",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  X
                </p>
                <p
                  style={{
                    textAlign: "bottom",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  : Ghế đã đặt
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "end",
                }}
              >
                <p
                  style={{
                    width: 37,
                    height: 30,
                    backgroundColor: "orange",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    marginRight: 10,
                    border: "1px solid black",
                  }}
                ></p>
                <p
                  style={{
                    textAlign: "bottom",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  : Ghế VIP
                </p>
              </div>
            </div>
          </div>
          <div className={styles.infor}>
            <h2 className={styles.total}>Tổng tiền : {Sum}</h2>
            <h3
              className={styles.movie_name}
              style={{ fontSize: 20, color: "#f73c24" }}
            >
              {lstSeat.thongTinPhim?.tenPhim}
            </h3>
            <span
              style={{
                display: "block",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Địa điểm:
              {lstSeat.thongTinPhim?.tenCumRap}
            </span>
            <span
              style={{
                display: "block",
                marginBottom: 10,
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Ngày chiếu:
              {lstSeat.thongTinPhim?.ngayChieu}
            </span>

            <p
              style={{
                color: "#f73c24",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Ghế:
            </p>
            <div
              className="flex flex-wrap"
              style={{
                marginBottom: 10,
                fontSize: 20,
                fontWeight: 500,
                color: "#f73c24",
              }}
            >
              {selectedSeat.map((seat) => {
                return <div className="pr-2 w-1/3">{seat.tenGhe}</div>;
              })}
            </div>
            <p
              style={{ marginBottom: 10, fontSize: 20, fontWeight: 500 }}
              className={styles.email}
            >
              <span style={{ display: "block" }}>Email: cvt0912@gmail.com</span>
            </p>
            <p
              style={{ marginBottom: 10, fontSize: 20, fontWeight: 500 }}
              className={styles.phone}
            >
              <span style={{ display: "block", marginBottom: 20 }}>
                Phone: 099250348
              </span>
            </p>
            <div>
              {selectedSeat.length > 0 ? (
                <a className={styles.btn} onClick={handleBookSeat}>
                  Đặt vé
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
