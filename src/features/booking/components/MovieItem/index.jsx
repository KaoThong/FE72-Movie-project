import React from "react";
import { Card } from "antd";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

const { Meta } = Card;

function MovieItem(props) {
  const { tenPhim, hinhAnh, moTa, maPhim } = props.item;
  const history = useHistory();

  const goToDetail = () => {
    history.push("/detail/" + maPhim);
  };
  return (
    <div>
      <Card
        className={style.movieItem}
        style={{ height: 400, borderRadius: 7 }}
        onClick={goToDetail}
        hoverable
        cover={
          <img
            style={{
              borderRadius: 7,
              height: 400,
              objectFit: "cover",
              objectPosition: "center top",
            }}
            alt="example"
            src={hinhAnh}
          />
        }
      ></Card>
    </div>
  );
}

export default MovieItem;
