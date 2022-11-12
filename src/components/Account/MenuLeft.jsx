import React from "react";
import { Link } from "react-router-dom";
class MenuLeft extends React.Component {
  render() {
    return (
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Account</h2>
          <div className="panel-group category-products" id="accordian">
            {/*category-productsr*/}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    to="/account/member"
                    data-toggle="collapse"
                    data-parent="#accordian"
                    href="#sportswear"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus" />
                    </span>
                    Account
                  </Link>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    to="/account/product/list"
                    data-toggle="collapse"
                    data-parent="#accordian"
                    href="#mens"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus" />
                    </span>
                    My Product
                  </Link>
                </h4>
              </div>
            </div>
          </div>
          {/*/category-products*/}
        </div>
      </div>
    );
  }
}
export default MenuLeft;
