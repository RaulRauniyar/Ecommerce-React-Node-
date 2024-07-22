import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !brand) {
      setError(true);
      return false;
    }

    console.warn(name, price, brand, category);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, brand, category, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      navigate("/");
    }
    result = await result.json();
    console.log(result);
    localStorage.setItem("product", JSON.stringify(result));
  };

  return (
    <div className="prdouct-head">
      <h1>AddProduct</h1>
      <div className="product">
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {error && !name && <span className="invalid"> Enter valid name</span>}
        <input
          className="inputBox"
          type="text"
          placeholder="Enter product price "
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        {error && !name && (
          <span className="invalid"> Enter price in numeric</span>
        )}

        <input
          className="inputBox"
          type="text"
          placeholder="Enter product brand"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        />
        {error && !name && <span className="invalid"> Enter valid brand</span>}

        <input
          className="inputBox"
          type="text"
          placeholder="Enter product category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        {error && !name && (
          <span className="invalid"> Enter valid category</span>
        )}

        <button onClick={addProduct} className="button-product">
          {" "}
          Add product
        </button>
      </div>
    </div>
  );
};

export default Addproduct;
