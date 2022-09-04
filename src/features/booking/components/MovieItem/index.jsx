import React from "react";
import { Card } from "antd";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

function MovieItem(props) {
  const { tenPhim, hinhAnh, moTa, maPhim } = props.item;
  const history = useHistory();

  const goToDetail = () => {
    history.push("/detail/" + maPhim);
  }
  return (
    <div>
      <Card
      onClick={goToDetail}
        hoverable
        cover={
          <img
            style={{
              height: 250,
              objectFit: "cover",
              objectPosition: "center top",
            }}
            alt="example"
            src={hinhAnh}
          />
        }
      >
        <Meta title={tenPhim} description={moTa.substr(0, 100) + "..."} />
      </Card>
    </div>
  );
}

export default MovieItem;
