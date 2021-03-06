import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import CategoryPage from './components/CategoryPage'
import CategoryForm from './components/CategoryForm'
import NavigationMenu from './components/NavigationMenu';
import CategoryList from './components/CategoryList';
import CategoryErrorsPage from './components/CategoryErrorsPage';
import SignUpPage from './components/SignUpPage';

import { connect } from 'react-redux';
import './assets/stylesheets/App.css';
import {
  selectCategory,
  getUserFromId,
} from './actions/actions.js'

const mapDispatchToProps = (dispatch) => ({
  selectCategory: (idx) => dispatch(selectCategory(idx)),
  getUserFromId: (id) => dispatch(getUserFromId(id)),
})

class App extends Component {
  componentWillMount = () => {
    const userId = parseInt(localStorage.getItem("userId"));
    if (userId) {
      this.props.getUserFromId(userId);
    }
  }
  render() {
    return (
      <>
        <NavigationMenu {...this.props} />
        <Switch className="app-page-container">
          <Route
            path={`${this.props.match.path}signup`}
            component={SignUpPage} />
          <Route
            path={`${this.props.match.path}categories/:id/edit`}
            exact
            render={(props) => {
              return <CategoryForm {...props} />
            }} />
          <Route
            path={`${this.props.match.path}categories/new`}
            exact
            render={(props) => {
              return <CategoryForm {...props} />
            }} />
          <Route
            path={`${this.props.match.path}categories/:name`}
            render={(props) => {
              return <CategoryPage {...props} />
            }} />
          <Route
            path={`${this.props.match.path}errors`}
            render={(props) => {
              return <CategoryErrorsPage {...props} />
            }} />
          <Route
            path={`${this.props.match.path}categories`}
            exact
            render={(props) => {
              return (
                <>
                  <div id="category-list">
                    <CategoryList
                      {...this.props}
                    />
                  </div>
                </>
              )
            }} />
          <Redirect to="/categories" />
        </Switch>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
