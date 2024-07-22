import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

export const ProductList = () => {
  const navigate = useNavigate();
  const [products, setPrdoucts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      authorization: JSON.parse(localStorage.getItem("token")),
    });
    result = await result.json();
    setPrdoucts(result);
    console.warn(products);  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchProduct = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setPrdoucts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <h1>ProductList </h1>
      <input
        className="search"
        type="text"
        placeholder="search"
        onChange={searchProduct}
      />

      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Brand</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>

      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>

            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>
                <button className="Update-button">Update</button>
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No result found</h1>
      )}
    </div>
  );
};
