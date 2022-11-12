import React from "react";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";
import StarRatings from "react-star-ratings";
class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      avg: {},
      sum: 0,
    };
    this.onStarClick = this.onStarClick.bind(this);
    this.renderRating = this.renderRating.bind(this);
  }
  onStarClick(nextValue) {
    this.setState({
      rating: nextValue,
    });
  }
  renderRating() {
    let isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (!isLogin) {
      alert("please login");
    } else {
      let idBlog = this.props.idBlog;
      const userData = JSON.parse(localStorage.getItem("appState"));
      let url = "http://localhost/laravel/public/api/blog/rate/" + idBlog;
      const accessToken = JSON.parse(localStorage.getItem("auth_token"));
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      let { rating } = this.state;
      if (rating) {
        const formData = new FormData();
        formData.append("blog_id", idBlog);
        formData.append("user_id", userData.id);
        formData.append("rate", rating);
        axios
          .post(url, formData, config)
          .then((response) => {
            if (response.data.errors) {
              this.setState({ formErrors: response.data.errors });
            }
          })
          .catch((error) => console.log(error));
      }
      let sum = this.state.sum;
      let avg = this.state.avg;
      Object.keys(avg).map((key, index) => {
        sum = parseInt(sum) + parseInt(avg[key]["rate"]) / avg.length;
      });
      return <li className="color">({sum.toFixed(1)} votes)</li>;
    }
  }
  componentDidMount() {
    axios
      .get("http://localhost/laravel/public/api/blog/rate/" + this.props.idBlog)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          avg: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <div className="rating-area">
          <ul className="ratings">
            <li className="rate-this">Rate this item:</li>
            {/* <li>
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                    </li> */}
            <StarRatingComponent
              name="rating test"
              starCount={6}
              value={this.state.rating}
              onStarClick={this.onStarClick}
            />
            {this.renderRating()}
          </ul>
          <ul className="tag">
            <li>TAG:</li>
            <li>
              <a className="color" href>
                Pink <span>/</span>
              </a>
            </li>
            <li>
              <a className="color" href>
                T-Shirt <span>/</span>
              </a>
            </li>
            <li>
              <a className="color" href>
                Girls
              </a>
            </li>
          </ul>
        </div>
        {/*/rating-area*/}
      </>
    );
  }
}
export default Rating;
