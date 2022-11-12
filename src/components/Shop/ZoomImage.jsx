import React from "react";
import { PopupboxContainer, PopupboxManager } from "react-popupbox";
import { Link } from "react-router-dom";
class ZoomImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  openPopupbox() {
    const content = <img url="static/demo.jpg" />;
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: "Meow!",
        },
        fadeIn: true,
        fadeInSpeed: 500,
      },
    });
  }

  render() {
    return (
      <div>
        <Link to="#" onClick={this.openPopupbox} rel="prettyPhoto">
          <h3>ZOOM</h3>
        </Link>
        <PopupboxContainer />
      </div>
    );
  }
}
export default ZoomImage;
