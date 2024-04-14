import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  React.useEffect(() => {});

  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };
  return (
    <>
      <div className="nav">
        <div className="left">
          <Link to="/" className="link">
            <h2>React Recipe App</h2>
          </Link>
        </div>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <input onChange={(e) => setInput(e.target.value)} type="text" />
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
};

// 1. breadcrumbs
// 2. catch toast
// 3. user authen
// 4. pagination
// 4. design good

export default Navbar;
