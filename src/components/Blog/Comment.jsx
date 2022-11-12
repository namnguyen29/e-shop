import axios from "axios";
import React from "react";
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      comment: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let idBlog = this.props.idBlog;
    let isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (!isLogin) {
      alert("Vui long dang nhap truoc");
    } else {
      const userData = JSON.parse(localStorage.getItem("appState"));
      let url = "http://localhost/laravel/public/api/blog/comment/" + idBlog;
      let accessToken = JSON.parse(localStorage.getItem("auth_token"));
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      let comment = this.state.comment;
      let idSubComment = this.props.idSubComment;
      console.log(idSubComment);
      if (comment) {
        const formData = new FormData();
        formData.append("id_blog", idBlog);
        formData.append("id_user", userData.id);
        formData.append("id_comment", idSubComment ? idSubComment : 0);
        formData.append("comment", this.state.comment);
        formData.append("image_user", userData.avatar);
        formData.append("name_user", userData.name);
        axios
          .post(url, formData, config)
          .then((response) => {
            console.log(response);
            if (response.data.errors) {
              this.setState({ formErrors: response.data.errors });
            } else {
              this.props.getComment(response.data.data);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }
  render() {
    return (
      <>
        <div className="replay-box">
          <div className="row">
            <div className="col-sm-12">
              <h2>Leave a replay</h2>
              <div className="text-area">
                <div className="blank-arrow">
                  <label>Your Name</label>
                </div>
                <span>*</span>
                <textarea
                  name="message"
                  rows={11}
                  defaultValue={""}
                  onChange={this.handleChange}
                  value={this.state.comment}
                />
                <a className="btn btn-primary" href onClick={this.handleSubmit}>
                  Post comment
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*/Repaly Box*/}
      </>
    );
  }
}
export default Comment;
