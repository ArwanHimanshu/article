import React from "react";
import "antd/dist/antd.css";
import "./style/index.scss";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import {
  PageNotFound,
  Login,
  Signup,
  PrivateRoute,
  Home,
  Article,
  AddArticle,
} from "./component";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <PrivateRoute path="/addArticle" component={AddArticle} exact />
            <Route path="/" exact component={Home}></Route>
            <Route path="/article/:id" exact component={Article}></Route>
            <Route path="/page-not-found" component={PageNotFound} exact />
            <Redirect from="*" to="/page-not-found" />
          </Switch>
        </BrowserRouter>
      </div>
    </ReduxProvider>
  );
}

export default App;
