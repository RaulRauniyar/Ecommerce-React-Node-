import React from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logOut = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="navbar">
      <img
        alt="logo"
        className="logo"
        // src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fe-commerce&psig=AOvVaw0VAMO3IFlZoYBxbfw25sRN&ust=1720602158051000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjOntXMmYcDFQAAAAAdAAAAABAJ"
        src="https://yt3.googleusercontent.com/ytc/AIdro_lpwLOOTumlQiiMYMHbBgJfQXVyRBGrZdTZ6NbtY-YA8wg=s900-c-k-c0x00ffffff-no-rj"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
            <li>
              <Link to="/update">Update Product</Link>
            </li>
            <li></li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logOut} to="/signup">
                Logout({JSON.parse(auth).name})
              </Link>
            </li>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
