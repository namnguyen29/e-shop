import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Checkout from "./components/Shop/Checkout";
import Cart from "./components/Shop/Cart";
import ContactUs from "./components/ContactUs";
import NotFound from "./components/NotFound";
import Products from "./components/Shop/Products";
import ProductDetail from "./components/Shop/ProductDetail";
import Blog from "./components/Blog/Blog";
import BlogDetail from "./components/Blog/BlogDetail";
import Register from "./components/Login/Register";
import WishList from "./components/WishList";
import Index from "./components/Account/Index";
ReactDOM.render(
  <>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/products" component={Products} />
          <Route path="/product/detail/:id" component={ProductDetail} />
          <Route path="/blog/list" component={Blog} /> {/*  /blog/list  */}
          <Route path="/blog/detail/:id" component={BlogDetail} />{" "}
          {/*blog/detail/:id */}
          <Route path="/register" component={Register} />
          <Route path="/wishlist" component={WishList} />
          {/*----------------------------------------------------------------- */}
          <Route component={Index} />
          <Route default component={NotFound} />
        </Switch>
      </App>
    </Router>
  </>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
