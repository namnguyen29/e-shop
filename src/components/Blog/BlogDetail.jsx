import React from "react";
import axios from "axios";
import MenuLeft from "../Layout/MenuLeft";
import ListComment from "./ListComment";
import Comment from "./Comment";
import Rating from "./Rating";
class BlogDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      comment: {},
      childComment: {},
      idSubComment: "",
    };
    this.renderBlogDetail = this.renderBlogDetail.bind(this);
    this.getComment = this.getComment.bind(this);
    this.getId = this.getId.bind(this);
  }
  getId(idComment) {
    console.log(idComment);
    this.setState({
      idSubComment: idComment,
    });
  }

  getComment(newComment) {
    console.log(newComment);
    let comment = this.state.comment;
    this.setState({
      comment: comment.concat(newComment),
    });
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost/laravel/public/api/blog/detail/" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          id: response.data.data,
          comment: response.data.data.comment,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  renderBlogDetail() {
    let title = this.state.id.title;
    let created_at = this.state.id.created_at;
    let updated_at = this.state.id.updated_at;
    let content = this.state.id.content;
    let image = this.state.id.image;
    let description = this.state.id.description;
    return (
      <>
        <MenuLeft />
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
            <div className="single-blog-post">
              <h3>{title}</h3>
              <div className="post-meta">
                <ul>
                  <li>
                    <i className="fa fa-user" /> Mac Doe
                  </li>
                  <li>
                    <i className="fa fa-clock-o" />
                    {created_at}
                  </li>
                  <li>
                    <i className="fa fa-calendar" />
                    {updated_at}
                  </li>
                </ul>
                {/* <span>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star-half-o"></i>
                        </span> */}
              </div>
              <a href>
                <img
                  src={
                    "http://localhost/laravel/public/upload/Blog/image/" + image
                  }
                  alt={description}
                />
              </a>
              <p>{content}</p>
              <div className="pager-area">
                <ul className="pager pull-right">
                  <li>
                    <a href="#">Pre</a>
                  </li>
                  <li>
                    <a href="#">Next</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*/blog-post-area*/}
          <Rating idBlog={this.props.match.params.id} />
          <div className="socials-share">
            <a href>
              <img src="images/blog/socials.png" alt="" />
            </a>
          </div>
          {/*/socials-share*/}
          <ListComment userComment={this.state.comment} getId={this.getId} />
          <Comment
            getId={this.getId}
            idSubComment={this.state.idSubComment}
            getComment={this.getComment}
            idBlog={this.props.match.params.id}
          />
        </div>
        {/*/Response-area*/}
      </>
    );
  }
  render() {
    return <>{this.renderBlogDetail()}</>;
  }
}
export default BlogDetail;
