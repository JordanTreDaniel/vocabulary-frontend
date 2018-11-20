import React, { Component } from 'react';
import { Route} from "react-router-dom";
import CategoryPage from './components/CategoryPage'
import './assets/stylesheets/App.css';
import {connect } from 'react-redux';
import { 
  fetchCategories, 
  fetchCategory, 
  handleCardFieldChange,
  handleCategoryFieldChange,
  updateCategory
 } from './actions/actions.js'
const API = 'https://codecabulary.herokuapp.com/api/v1';
const LOCAL = `http://localhost:3000/api/v1`


class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    }
  }
  render() {
    return (
      <div className="app-page-container">
        <Route 
          path={`${this.props.match.path}/categories`} 
          render={(props) => {
            let { categories, category } = this.props;
            return <CategoryPage 
              categories={categories}  
              cards={category.cards}
              category={category}
              props={props}
              fetchCategories={this.props.fetchCategories}
              fetchCategory={id => this.props.fetchCategory(id)}
              handleCategoryFieldChange={this.handleCategoryFieldChange}
              handleSubmit={this.handleSubmit}
              handleCardFieldChange={this.handleCardFieldChange}
            />
        }}/>
      </div>
    );
  }

  handleCardFieldChange = (e, idx) => {
    e.persist();
    let {name, value} = e.target;
    this.props.handleCardFieldChange(name, value, idx);
  }
  handleCategoryFieldChange = (e) => {
    e.persist();
    let {name, value} = e.target;
    this.props.handleCategoryFieldChange(name, value);
  }

  handleSubmit = (event) => {
    this.props.updateCategory(this.props.category);
    this.props.history.push('/categories')
  }
}
const mapStateToProps = (state) => ({
  category: state.category,
  categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchCategory: (id) => dispatch(fetchCategory(id)),
  handleCardFieldChange: (name, value, idx) => dispatch(handleCardFieldChange(name, value, idx)),
  handleCategoryFieldChange: (name, value) => dispatch(handleCategoryFieldChange(name, value)),
  updateCategory: (category) => dispatch(updateCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
