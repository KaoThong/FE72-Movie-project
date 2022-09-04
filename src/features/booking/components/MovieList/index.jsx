import React, { memo } from "react";
import { useSelector } from "react-redux";
import MovieItem from "../MovieItem";
import { Space, Spin, Row, Col } from "antd";

function MovieList() {
  const movieInfo = useSelector((state) => state.booking.movies);

  if (!movieInfo)
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  return (
    <div className="container">
      <Row gutter={20}>
        {movieInfo.items.map((item) => {
          return (
            <Col key={item} xs={24} sm={12} md={8} lg={6} style= {{marginBottom: "20px"}}>
              <MovieItem item={item}/>
            </Col>
          );
        })}
      </Row>
      
    </div>
  );
}

export default memo(MovieList);

// memo = PureComponent
// virtual DOM