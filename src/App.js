import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import CategoryPage from './components/CategoryPage'
import CategoryEdit from './components/CategoryEdit'
import './assets/stylesheets/App.css';
class App extends Component {

  render() {
    return (
      <Switch className="app-page-container">
        <Route
          path={`${this.props.match.path}/categories/:id/edit`}
          exact
          render={(props) => {
            return <CategoryEdit {...props} />
          }} />
        <Route
          path={`${this.props.match.path}/categories/new`}
          exact
          render={(props) => {
            return <CategoryEdit {...props} />
          }} />
        <Route
          path={`${this.props.match.path}/categories`}
          render={(props) => {
            return <CategoryPage {...props} />
          }} />
      </Switch>
    );
  }
}

export default App;
