import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import CategoryPage from './components/CategoryPage'
import CategoryForm from './components/CategoryForm'
import NavigationMenu from './components/NavigationMenu';
import CategoryList from './components/CategoryList';
import CategoryErrorsPage from './components/CategoryErrorsPage';
import { connect } from 'react-redux';
import './assets/stylesheets/App.css';
import {
  selectCategory,
} from './actions/actions.js'

const mapDispatchToProps = (dispatch) => ({
  selectCategory: (idx) => dispatch(selectCategory(idx)),
})

class App extends Component {
  render() {
    return (
      <>
        <NavigationMenu {...this.props} />
        <Switch className="app-page-container">
          <Route
            path={`${this.props.match.path}/categories/:id/edit`}
            exact
            render={(props) => {
              return <CategoryForm {...props} />
            }} />
          <Route
            path={`${this.props.match.path}/categories/new`}
            exact
            render={(props) => {
              return <CategoryForm {...props} />
            }} />
          <Route
            path={`${this.props.match.path}/categories/:name`}
            render={(props) => {
              return <CategoryPage {...props} />
            }} />
          <Route
            path={`${this.props.match.path}/errors`}
            render={(props) => {
              return <CategoryErrorsPage {...props} />
            }} />
          <Route
            path={`${this.props.match.path}`}
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
        </Switch>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
