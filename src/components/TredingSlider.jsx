import React, { useState } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const TrendingSlider = () => {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const api = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
      );
      const data = await api.json();

      // console.log(data.meals);
      setData(data?.meals);
    };

    fetchData();
  }, []);

  var settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 500,
    cssEase: "linear",
  };

  return (
    <>
      <div
        style={{
          width: "99%",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "flex-col",
          // backgroundColor:'yellow'
        }}
      >
        <Slider
          {...settings}
          style={{
            marginTop: "1rem",
          }}
        >
          {" "}
        </Slider>

        {data.map((d) => {
          return (
            <Link to={`/${d.idMeal}`} key={d.idMeal}>
              <div className="slider2">
                <img
                  src={d.strMealThumb}
                  alt=""
                  style={{ width: "10rem", height: "7rem" }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default TrendingSlider;
