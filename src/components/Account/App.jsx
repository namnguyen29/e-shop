import React from "react";
import { withRouter } from "react-router-dom";
import MenuLeft from "./MenuLeft";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <section>
          <div className="container">
            <div className="row">
              <MenuLeft />
              {this.props.children}
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default withRouter(App);
