import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Updateproduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setBrand(result.brand);
    setCategory(result.category);
  };

  const updateProduct = async () => {
    if (!name || !price || !category || !brand) {
      setError(true);
      return false;
    }

    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, brand, category }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      navigate("/");
    }
    result = await result.json();
  };

  return (
    <div className="prdouct-head">
      <h1>Update Product</h1>
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

        <button onClick={updateProduct} className="button-product">
          {" "}
          Update product
        </button>
      </div>
    </div>
  );
};

export default Updateproduct;
