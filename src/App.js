import "./App.css";
import React from "react";
import { withRouter } from "react-router-dom";
import Head from "./components/Layout/Head";
import Footer from "./components/Layout/Footer";
import { AppContext } from "./components/AppContext";

class App extends React.Component {
  // static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      item: [],
    };
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
        }}
      >
        <Head />
        <section>
          <div className="container">
            <div className="row">{this.props.children}</div>
          </div>
        </section>
        <Footer />
      </AppContext.Provider>
    );
  }
}
export default withRouter(App);
