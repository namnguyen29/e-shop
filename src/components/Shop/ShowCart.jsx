import React from "react";
const imgSize = {
  width: "100px",
  height: "100px",
};
class ShowCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartQty: "",
      cartId: "",
      cartPrice: "",
      cartImg: [],
      showProduct: true,
      cartName: "",
      userId: "",
      cartNumber: "",
    };
    this.ShowCart = this.ShowCart.bind(this);
    this.cartUp = this.cartUp.bind(this);
    this.cartDown = this.cartDown.bind(this);
    this.cartDelete = this.cartDelete.bind(this);
  }
  componentDidMount() {
    this.setState({
      userId: this.props.userId,
      cartName: this.props.cartName,
      cartQty: this.props.cartQty,
      cartImg: this.props.cartImg,
      cartId: this.props.cartId,
      cartPrice: this.props.cartPrice,
      cartNumber: this.props.cartNumber,
    });
  }

  cartUp() {
    let cartQty = this.state.cartQty;
    cartQty += 1;
    this.setState({
      cartQty: cartQty,
    });
    let cart = JSON.parse(localStorage.getItem("product_info"));
    Object.keys(cart).map((key, index) => {
      if (this.state.cartId == key) {
        cart[key] = cartQty;
        let cvtCart = JSON.stringify(cart);
        localStorage.setItem("product_info", cvtCart);
      }
    });
  }

  cartDown() {
    let cartQty = this.state.cartQty;
    cartQty -= 1;
    this.setState({
      cartQty: cartQty,
    });
    let cart = JSON.parse(localStorage.getItem("product_info"));
    Object.keys(cart).map((key, index) => {
      if (this.state.cartId == key) {
        cart[key] = cartQty;
        let cvtCart = JSON.stringify(cart);
        localStorage.setItem("product_info", cvtCart);
      }
      if (cart[key] == 0) {
        this.setState({
          showProduct: false,
        });
        delete cart[key];
        let cvtCart = JSON.stringify(cart);
        localStorage.setItem("product_info", cvtCart);
      }
    });
  }

  cartDelete() {
    // let cartDelete = document.getElementById("product");
    this.setState({
      showProduct: false,
    });
    let cart = JSON.parse(localStorage.getItem("product_info"));
    Object.keys(cart).map((key, index) => {
      if (this.state.cartId == key) {
        delete cart[key];
        let cvtCart = JSON.stringify(cart);
        localStorage.setItem("product_info", cvtCart);
      }
    });
  }

  ShowCart() {
    let cartImg = this.state.cartImg;
    let { cartNumber } = this.state;
    if (cartNumber > 0) {
      cartImg = JSON.parse(cartImg);
      console.log(cartImg);
    }
    console.log(this.state.userId);
    return (
      <tr id="product">
        <td className="cart_product">
          <a href>
            <img
              style={imgSize}
              src={
                "http://localhost/laravel/public/upload/user/product/" +
                this.state.userId +
                "/" +
                cartImg[0]
              }
              alt="img"
            />
          </a>
        </td>
        <td className="cart_description">
          <h4>
            <a href>{this.state.cartName}</a>
          </h4>
          <p>Web ID: 1089772</p>
        </td>
        <td className="cart_price">
          <p>{this.state.cartPrice}</p>
        </td>
        <td className="cart_quantity">
          <div className="cart_quantity_button">
            <a
              style={{ cursor: "pointer" }}
              className="cart_quantity_up"
              onClick={this.cartUp}
            >
              {" "}
              +{" "}
            </a>

            <input
              className="cart_quantity_input"
              type="text"
              name="quantity"
              defaultValue={this.state.cartQty}
              autoComplete="off"
              size={2}
            />

            <a
              style={{ cursor: "pointer" }}
              className="cart_quantity_down"
              onClick={this.cartDown}
            >
              {" "}
              -{" "}
            </a>
          </div>
        </td>
        <td className="cart_total">
          <p className="cart_total_price">
            {this.state.cartPrice * this.state.cartQty}
          </p>
        </td>
        <td className="cart_delete">
          <a
            onClick={this.cartDelete}
            className="cart_quantity_delete"
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-times" />
          </a>
        </td>
      </tr>
    );
  }
  render() {
    return <>{this.state.showProduct && this.ShowCart()}</>;
  }
}
export default ShowCart;
