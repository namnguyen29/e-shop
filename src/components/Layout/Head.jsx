import React from "react";
import { Link, withRouter } from "react-router-dom";
class Head extends React.Component {
  constructor(props) {
    super(props);
    // this.state ={};
    this.renderLogin = this.renderLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.renderAccount = this.renderAccount.bind(this);
  }
  renderAccount() {
    let getLocal = JSON.parse(localStorage.getItem("isLogin"));
    if (getLocal) {
      return (
        <li>
          <Link to="/account/member">
            <i className="fa fa-user" /> Account
          </Link>
        </li>
      );
    }
  }
  renderLogin() {
    let getLocal = JSON.parse(localStorage.getItem("isLogin"));
    if (getLocal) {
      return (
        <li>
          <Link onClick={this.logout}>
            <i className="fa fa-lock" /> Logout
          </Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/login">
            <i className="fa fa-lock" /> Login
          </Link>
        </li>
      );
    }
  }
  logout() {
    let status = false;
    let cvtJSON = JSON.stringify(status);
    localStorage.setItem("isLogin", cvtJSON);
    this.props.history.push("/login");
    localStorage.clear();
  }
  render() {
    return (
      <header id="header">
        {/*header*/}
        <div className="header_top">
          {/*header_top*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <a href>
                        <i className="fa fa-phone" /> +2 95 01 88 821
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-envelope" /> info@domain.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to>
                        <i className="fa fa-facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-linkedin" />
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-dribbble" />
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-google-plus" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/header_top*/}
        <div className="header-middle">
          {/*header-middle*/}
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to="/">
                    <img src="/frontend/images/home/logo.png" alt="logo" />
                  </Link>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href>Canada</a>
                      </li>
                      <li>
                        <a href>UK</a>
                      </li>
                    </ul>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href>Canadian Dollar</a>
                      </li>
                      <li>
                        <a href>Pound</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    {this.renderAccount()}
                    <li>
                      <Link to="/wishlist">
                        <i className="fa fa-star" /> Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link to="/checkout">
                        <i className="fa fa-crosshairs" /> Checkout
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart">
                        <i className="fa fa-shopping-cart" /> Cart
                      </Link>
                    </li>
                    {this.renderLogin()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/header-middle*/}
        <div className="header-bottom">
          {/*header-bottom*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        Shop
                        <i className="fa fa-angle-down" />
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to="/products">Products</Link>
                        </li>
                        <li>
                          <Link to="/product/detail/:id">Product Details</Link>
                        </li>
                        <li>
                          <Link to="/checkout">Checkout</Link>
                        </li>
                        <li>
                          <Link to="/cart">Cart</Link>
                        </li>
                        <li>
                          <Link to="/login" className="active">
                            Login
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        Blog
                        <i className="fa fa-angle-down" />
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to="/blog/list">Blog List</Link>
                        </li>
                        <li>
                          <Link to="/blog/detail/:id">Blog Single</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to>404</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default withRouter(Head);
