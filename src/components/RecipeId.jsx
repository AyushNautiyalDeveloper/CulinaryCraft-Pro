/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TrendingSlider from "./TredingSlider";
import { useParams } from "react-router-dom";

const RecipeId = () => {
  const { idMeal } = useParams();
  React.useEffect(() => {});

  const [data, setData] = useState([]);
  const [active, setActive] = useState("ingredient");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleGetSummary = async () => {
    try {
      setIsloading(true);
      const api = await fetch(
        `${process.env.VITE_APP_FOOD_API}/recipes/${idMeal}/summary?apiKey=${process.env.VITE_APP_FOOD_RECIPE_API_KEY}`
      );
      const data = await api.json();
      setSummary(data?.summary);
    } catch (error) {
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    if (active === "instruction") {
      handleGetSummary();
    }
  }, [active]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true);
        const api = await fetch(
          `${process.env.VITE_APP_FOOD_API}/recipes/${idMeal}/ingredientWidget.json?apiKey=${process.env.VITE_APP_FOOD_RECIPE_API_KEY}`
        );
        const data = await api.json();
        setData(data.ingredients);
      } catch (error) {
        setIsloading(false);
      } finally {
        setIsloading(false);
      }
    };

    fetchData();
  }, [idMeal]);
  const getImage = () => {
    return `https://img.spoonacular.com/recipes/${idMeal}-312x231.jpg`;
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          width: "90%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1>{data.strMeal}</h1>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className="img">
            <img src={getImage()} alt="" style={{ width: "18rem" }} />
          </div>

          <div className="content" style={{ width: "60%" }}>
            <button className="btn" onClick={() => setActive("ingredient")}>
              Ingredient
            </button>
            <button className="btn" onClick={() => setActive("instruction")}>
              Instruction
            </button>

            {isLoading ? (
              <div className="flex text-white px-6 text-center text-base font-semibold font-inter leading-6 pt-4">
                Loading...
              </div>
            ) : active === "ingredient" ? (
              <div>
                {data?.map((value, index) => {
                  return (
                    <div
                      key={`${value.name}${index}`}
                      style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                    >
                      {value?.name} - {value?.amount?.metric?.value}
                      {value?.amount?.metric?.unit}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{ __html: summary }}
                ></div>
              </p>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <TrendingSlider />
      </div>
    </>
  );
};

export default RecipeId;
