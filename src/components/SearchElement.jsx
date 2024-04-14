/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TrendingSlider from "./TredingSlider";
import { useParams, Link } from "react-router-dom";

const SearchElement = () => {
  const { searchTerm } = useParams();
  console.log({ searchTerm });

  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(searchTerm, data);
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      const api = await fetch(
        `${process.env.VITE_APP_FOOD_API}/recipes/complexSearch?apiKey=${process.env.VITE_APP_FOOD_RECIPE_API_KEY}&q=${searchTerm}`
      );
      const data = await api.json();
      setData(data?.results);
    };

    fetchData();
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <div
        style={{
          width: "90%",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
          gridGap: "1rem",
          marginTop: "2rem",
        }}
      >
        {data?.map((d) => {
          return (
            <Link key={d.id} to={`/${d.id}`} className="link">
              <div style={{ textAlign: "center" }}>
                <div className="img">
                  <img src={d.image} alt="" style={{ width: "13rem" }} />
                </div>
                <h3>{d.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>

      <TrendingSlider />
    </>
  );
};

export default SearchElement;
