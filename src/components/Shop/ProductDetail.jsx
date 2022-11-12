import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import MenuLeft from "../Layout/MenuLeft";
import ZoomImage from "./ZoomImage";
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getProduct: {},
      thumbnail: "",
      images: [],
    };
    this.renderEachProduct = this.renderEachProduct.bind(this);
  }
  componentDidMount() {
    let url =
      "http://localhost/laravel/public/api/product/detail/" +
      this.props.match.params.id;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        this.setState({
          getProduct: res.data.data,
          thumbnail: res.data.data.image,
        });
      })
      .catch((error) => console.log(error));
  }
  renderEachProduct() {
    let getProduct = this.state.getProduct;
    let { thumbnail } = this.state;
    let { images } = this.state;
    if (Object.keys(getProduct).length > 0) {
      thumbnail = JSON.parse(thumbnail);
      for (let index = 0; index < thumbnail.length; index++) {
        images.push("larger_" + thumbnail[index]);
        images.push("small_" + thumbnail[index]);
        images.push(thumbnail[index]);
      }
    }
    console.log(images);

    return (
      <div className="col-sm-9 padding-right">
        <div className="product-details">
          {/*product-details*/}
          <div className="col-sm-5">
            <div className="view-product">
              <img
                src={
                  "http://localhost/laravel/public/upload/user/product/" +
                  getProduct["id_user"] +
                  "/" +
                  thumbnail[0]
                }
                alt="113"
              />

              {/* <Link to="#" rel="prettyPhoto"><h3>ZOOM</h3></Link> */}
              {/*Popup */}
              <ZoomImage />
            </div>
            <div
              id="similar-product"
              className="carousel slide"
              data-ride="carousel"
            >
              {/* Wrapper for slides */}
              <div className="carousel-inner">
                <div className="item active">
                  <a href>
                    <img
                      src="/frontend/images/product-details/similar1.jpg"
                      alt=""
                    />
                  </a>
                  <a href>
                    <img
                      src="/frontend/images/product-details/similar2.jpg"
                      alt=""
                    />
                  </a>
                  <a href>
                    <img
                      src="/frontend/images/product-details/similar3.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="item">
                  <a href>
                    <img src="images/product-details/similar1.jpg" alt="" />
                  </a>
                  <a href>
                    <img src="images/product-details/similar2.jpg" alt="" />
                  </a>
                  <a href>
                    <img src="images/product-details/similar3.jpg" alt="" />
                  </a>
                </div>
                <div className="item">
                  <a href>
                    <img src="images/product-details/similar1.jpg" alt="" />
                  </a>
                  <a href>
                    <img src="images/product-details/similar2.jpg" alt="" />
                  </a>
                  <a href>
                    <img src="images/product-details/similar3.jpg" alt="" />
                  </a>
                </div>
              </div>
              {/* Controls */}
              <a
                className="left item-control"
                href="#similar-product"
                data-slide="prev"
              >
                <i className="fa fa-angle-left" />
              </a>
              <a
                className="right item-control"
                href="#similar-product"
                data-slide="next"
              >
                <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
          <div className="col-sm-7">
            <div className="product-information">
              {/*/product-information*/}
              <img
                src="images/product-details/new.jpg"
                className="newarrival"
                alt=""
              />
              <h2> {getProduct["name"]} </h2>
              <p>Web ID: 1089772</p>
              <img src="images/product-details/rating.png" alt="" />
              <span>
                <span> {getProduct["price"]}</span>
                <label>Quantity:</label>
                <input type="text" defaultValue={3} />
                <button type="button" className="btn btn-fefault cart">
                  <i className="fa fa-shopping-cart" />
                  Add to cart
                </button>
              </span>
              <p>
                <b>Availability:</b> In Stock
              </p>
              <p>
                <b>Condition:</b> New
              </p>
              <p>
                <b>Brand:</b> {getProduct["id_brand"]}
              </p>
              <a href>
                <img
                  src="images/product-details/share.png"
                  className="share img-responsive"
                  alt=""
                />
              </a>
            </div>
            {/*/product-information*/}
          </div>
        </div>
        {/*/product-details*/}
        <div className="category-tab shop-details-tab">
          {/*category-tab*/}
          <div className="col-sm-12">
            <ul className="nav nav-tabs">
              {/*Xem cho nay */}
              <li>
                <Link to="" data-toggle="tab">
                  Details
                </Link>
              </li>
              <li>
                <Link to="" data-toggle="tab">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link to="" data-toggle="tab">
                  Tag
                </Link>
              </li>
              <li className="active">
                <a href="#reviews" data-toggle="tab">
                  Reviews (5)
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade" id="details">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="companyprofile">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="tag">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button
                        type="button"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade active in" id="reviews">
              <div className="col-sm-12">
                <ul>
                  <li>
                    <a href>
                      <i className="fa fa-user" />
                      EUGEN
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-clock-o" />
                      12:41 PM
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-calendar-o" />
                      31 DEC 2014
                    </a>
                  </li>
                </ul>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  <b>Write Your Review</b>
                </p>
                <form action="#">
                  <span>
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Email Address" />
                  </span>
                  <textarea name defaultValue={""} />
                  <b>Rating: </b>{" "}
                  <img src="images/product-details/rating.png" alt="" />
                  <button type="button" className="btn btn-default pull-right">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*/category-tab*/}
        <div className="recommended_items">
          {/*recommended_items*/}
          <h2 className="title text-center">recommended items</h2>
          <div
            id="recommended-item-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="item active">
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="left recommended-item-control"
              href="#recommended-item-carousel"
              data-slide="prev"
            >
              <i className="fa fa-angle-left" />
            </a>
            <a
              className="right recommended-item-control"
              href="#recommended-item-carousel"
              data-slide="next"
            >
              <i className="fa fa-angle-right" />
            </a>
          </div>
        </div>
        {/*/recommended_items*/}
      </div>
    );
  }
  render() {
    return (
      <>
        <MenuLeft />
        {this.renderEachProduct()}
      </>
    );
  }
}
export default ProductDetail;
