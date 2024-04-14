/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const PopularSlider = () => {
  React.useEffect(() => {});
  const [data, setData] = useState([]);

  // useEffect(() => console.log(data), [data]);
  useEffect(() => {
    const fetchData = async () => {
      const api = await fetch(
        `${process.env.VITE_APP_FOOD_API}/recipes/complexSearch?apiKey=${process.env.VITE_APP_FOOD_RECIPE_API_KEY}&q=`
      );
      const data = await api.json();
      console.log(data);
      // console.log(data.meals);
      setData(data?.results);
    };

    fetchData();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <>
      <div
        style={{
          width: "99%",
          overflowX: "hidden",
          display: "flex",
          // flexDirection: "flex-col",
          // backgroundColor: "yellow",
        }}
      >
        <Slider
          {...settings}
          style={{
            margin: "1rem",
          }}
        ></Slider>
        {data?.map((d) => {
          return (
            <Link to={`/${d?.id}`} key={d?.id}>
              <div className="slider">
                <img
                  src={d?.image}
                  alt=""
                  style={{ width: "18rem", height: "17rem" }}
                />
              </div>
              <h3>{d?.title}</h3>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default PopularSlider;
