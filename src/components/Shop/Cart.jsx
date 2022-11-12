import React from "react";
import axios from "axios";
import ShowCart from "./ShowCart";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cartNumber: "",
    };
    this.renderCart = this.renderCart.bind(this);
  }

  componentDidMount() {
    let getCart = localStorage.getItem("product_info");
    if (getCart) {
      let carts = JSON.parse(getCart);

      axios
        .post("http://localhost/laravel/public/api/product/cart", carts)
        .then((response) => {
          console.log(response);
          this.setState({
            data: response.data.data,
            cartNumber: response.data.data.length,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  renderCart() {
    let { data } = this.state;
    if (data.length > 0) {
      return data.map((value, key) => {
        return (
          <ShowCart
            cartImg={data[key]["image"]}
            cartPrice={data[key]["price"]}
            cartId={data[key]["id"]}
            cartQty={data[key]["qty"]}
            cartName={data[key]["name"]}
            userId={data[key]["id_user"]}
            cartNumber={this.state.cartNumber}
          />
        );
      });
    }
  }

  render() {
    return (
      <>
        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li>
                  <a href="#">Home</a>
                </li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>{this.renderCart()}</tbody>
              </table>
            </div>
          </div>
        </section>{" "}
        {/*/#cart_items*/}
        <section id="do_action">
          <div className="container">
            <div className="heading">
              <h3>What would you like to do next?</h3>
              <p>
                Choose if you have a discount code or reward points you want to
                use or would like to estimate your delivery cost.
              </p>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="chose_area">
                  <ul className="user_option">
                    <li>
                      <input type="checkbox" />
                      <label>Use Coupon Code</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Use Gift Voucher</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Estimate Shipping &amp; Taxes</label>
                    </li>
                  </ul>
                  <ul className="user_info">
                    <li className="single_field">
                      <label>Country:</label>
                      <select>
                        <option>United States</option>
                        <option>Bangladesh</option>
                        <option>UK</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Ucrane</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field">
                      <label>Region / State:</label>
                      <select>
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>London</option>
                        <option>Dillih</option>
                        <option>Lahore</option>
                        <option>Alaska</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field zip-field">
                      <label>Zip Code:</label>
                      <input type="text" />
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>
                    Get Quotes
                  </a>
                  <a className="btn btn-default check_out" href>
                    Continue
                  </a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="total_area">
                  <ul>
                    <li>
                      Cart Sub Total <span>$59</span>
                    </li>
                    <li>
                      Eco Tax <span>$2</span>
                    </li>
                    <li>
                      Shipping Cost <span>Free</span>
                    </li>
                    <li>
                      Total <span>$61</span>
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>
                    Update
                  </a>
                  <a className="btn btn-default check_out" href>
                    Check Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*/#do_action*/}
      </>
    );
  }
}
export default Cart;
