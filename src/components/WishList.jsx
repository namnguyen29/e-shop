import axios from "axios";
import React from "react";
import { contextType } from "react-star-rating-component";
import { AppContext } from "./AppContext";

class WishList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.context.state);
    axios
      .get("http://localhost/laravel/public/api/product/wishlist")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
  render() {
    return <p>123 </p>;
  }
}
WishList.contextType = AppContext;
export default WishList;
