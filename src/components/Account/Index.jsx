import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import Update from "./Member/Update";
import List from "./Product/List";
import AddEdit from "./Product/AddEdit";
import Edit from "./Product/Edit";
class Index extends React.Component {
  render() {
    return (
      <App>
        <Switch>
          <Route path="/account/member" component={Update} />
          <Route path="/account/product/list" component={List} />
          <Route path="/account/product/add-edit/:id?" component={AddEdit} />
          <Route path="/account/product/edit/:id?" component={Edit} />
        </Switch>
      </App>
    );
  }
}
export default Index;
