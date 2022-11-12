import React from "react";
const size = {
  width: "100px",
  height: "100px",
};
class ListComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderComment = this.renderComment.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
  }
  handleReplay(event) {
    event.preventDefault();
    let scroll = document.querySelector(".replay-box");
    scroll.scrollIntoView();
    this.props.getId(event.target.id);
  }
  renderComment() {
    let userComment = this.props.userComment;
    if (Object.keys(userComment).length > 0) {
      return Object.keys(userComment).map((key, index) => {
        if (userComment[key]["id_comment"] == 0) {
          return (
            <>
              <li className="media">
                <a className="pull-left" href="#">
                  <img
                    style={size}
                    className="media-object"
                    src={
                      "http://localhost/laravel/public/upload/user/avatar/" +
                      userComment[key]["image_user"]
                    }
                    alt="1"
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user" />
                      {userComment[key]["name_user"]}
                    </li>
                    <li>
                      <i className="fa fa-clock-o" />
                      {userComment[key]["created_at"]}
                    </li>
                    <li>
                      <i className="fa fa-calendar" />
                      {userComment[key]["updated_at"]}
                    </li>
                  </ul>
                  <p>{userComment[key]["comment"]}</p>
                  <a
                    id={userComment[key]["id"]}
                    className="btn btn-primary"
                    href
                    onClick={this.handleReplay}
                  >
                    <i className="fa fa-reply" /> Replay
                  </a>
                </div>
              </li>
              {Object.keys(userComment).map((nextKey, index) => {
                if (
                  userComment[nextKey]["id_comment"] == userComment[key]["id"]
                ) {
                  return (
                    <li className="media second-media">
                      <a className="pull-left" href="#">
                        <img
                          style={size}
                          className="media-object"
                          src={
                            "http://localhost/laravel/public/upload/user/avatar/" +
                            userComment[nextKey]["image_user"]
                          }
                          alt=""
                        />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li>
                            <i className="fa fa-user" />
                            {userComment[nextKey]["name_user"]}
                          </li>
                          <li>
                            <i className="fa fa-clock-o" />{" "}
                            {userComment[nextKey]["created_at"]}
                          </li>
                          <li>
                            <i className="fa fa-calendar" />{" "}
                            {userComment[nextKey]["updated_at"]}
                          </li>
                        </ul>
                        <p>{userComment[nextKey]["comment"]}</p>
                        <a className="btn btn-primary" href>
                          <i className="fa fa-reply" />
                          Replay
                        </a>
                      </div>
                    </li>
                  );
                }
              })}
            </>
          );
        }
      });
    }
  }
  render() {
    return (
      <>
        <div className="response-area">
          <h2>3 RESPONSES</h2>
          <ul className="media-list">{this.renderComment()}</ul>
        </div>
        {/*/Response-area*/}
      </>
    );
  }
}
export default ListComment;
