import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MenuLeft from "../Layout/MenuLeft";
class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
    this.renderBlog = this.renderBlog.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost/laravel/public/api/blog")
      .then((res) => {
        this.setState({ data: res.data.blog.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  renderBlog() {
    let data = this.state.data;
    if (Object.keys(data).length > 0) {
      return Object.keys(data).map(function (key, index) {
        return (
          <div className="single-blog-post">
            <h3 key={key}>{data[key]["title"]}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user" /> Mac Doe
                </li>
                <li key={key}>
                  <i className="fa fa-clock-o" /> {data[key]["created_at"]}
                </li>
                <li key={key}>
                  <i className="fa fa-calendar" /> {data[key]["updated_at"]}
                </li>
              </ul>
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <a key={key}>
              <img
                src={
                  "http://localhost/laravel/public/upload/Blog/image/" +
                  data[key]["image"]
                }
                alt="123"
              />
            </a>

            <p key={key}>{data[key]["content"]}</p>
            <Link
              className="btn btn-primary"
              to={"/blog/detail/" + data[key]["id"]}
            >
              Read More
            </Link>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <MenuLeft />
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
            {/*get API */}
            {this.renderBlog()}

            <div className="single-blog-post">
              <h3>Girls Pink T Shirt arrived in store</h3>
              <div className="post-meta">
                <ul>
                  <li>
                    <i className="fa fa-user" /> Mac Doe
                  </li>
                  <li>
                    <i className="fa fa-clock-o" /> 1:33 pm
                  </li>
                  <li>
                    <i className="fa fa-calendar" /> DEC 5, 2013
                  </li>
                </ul>
                <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                </span>
              </div>
              <a href>
                <img src="images/blog/blog-one.jpg" alt="where" />
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <a className="btn btn-primary" href="#">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Blog;
