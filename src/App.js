import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import CategoryPage from './components/CategoryPage'
import CategoryEdit from './components/CategoryEdit'
import NavigationMenu from './components/NavigationMenu';
import CategoryList from './components/CategoryList';
import { connect } from 'react-redux';
import './assets/stylesheets/App.css';
import {
  fetchCategories,
  selectCategory,
} from './actions/actions.js'



const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  selectCategory: (idx) => dispatch(selectCategory(idx)),
})
const mapStateToProps = (state) => {
  return ({
    selectedCategoryIndex: state.selectedCategoryIndex,
    categories: state.categories,
  })
}


class App extends Component {
  componentWillMount = () => {
    this.props.fetchCategories();
  }

  render() {
    return (
      <>
        <NavigationMenu {...this.props} />
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
            path={`${this.props.match.path}/categories/:id`}
            render={(props) => {
              return <CategoryPage {...props} />
            }} />
          <Route
            path={`${this.props.match.path}`}
            render={(props) => {
              return (
                <>
                  <div id="category-list">
                    <CategoryList
                      categories={this.props.categories}
                      initialIndex={this.props.selectedCategoryIndex}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
