import logo from "./logo.svg";
import "./App.css";
import { Nav } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateComponent } from "./Components/PrivateComponents";
import Addproduct from "./Components/AddProduct";
import { ProductList } from "./Components/ProductList";
import Updateproduct from "./Components/UpdatePRoduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<Addproduct />} />
            <Route path="/update/:id" element={<Updateproduct />} />
            <Route path="/logout" element={<h1> product logout </h1>} />
            <Route path="/profile" element={<h1> product profile </h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
