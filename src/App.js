import React, { Component } from 'react';
import { Route} from "react-router-dom";
import CategoryPage from './components/CategoryPage'
import './assets/stylesheets/App.css';
import {connect } from 'react-redux';
import { 
  setCategories, 
  setCategory, 
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
              fetchCategories={this.fetchCategories}
              fetchCategory={id => this.fetchCategory(id)}
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
    this.updateCategory();
  }

  updateCategory = () => {
    fetch(`${LOCAL}/categories/${this.props.category.id}`, {
      method: "PATCH",
      body: JSON.stringify(this.props.category),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(category => {
      this.props.updateCategory()
      this.props.history.push(`/categories`)
    })
    .catch(err => {
      debugger;
    })
  }

  fetchCategory = (id) => {
    fetch(`${LOCAL}/categories/${id}`)
    .then(res => res.json())
    .then(res => {
      this.props.setCategory(res);
    })
    .catch(err => {
      throw err;
    })
  }

  fetchCategories = () => {
    fetch(`${LOCAL}/categories`)
      .then(res => res.json())
      .then(res => {
        this.props.setCategories(res.sort((a, b) => {
          return a.id - b.id
        }));
        //must set a default category for state to display
        this.fetchCategory(res[0].id)
      })
      .catch(err => {
        throw err;
      })
  }
}
const mapStateToProps = (state) => ({
  category: state.category,
  categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
  setCategories: (categoryArr) => dispatch(setCategories(categoryArr)),
  setCategory: (categoryObj, cardsArr) => dispatch(setCategory(categoryObj, cardsArr)),
  handleCardFieldChange: (name, value, idx) => dispatch(handleCardFieldChange(name, value, idx)),
  handleCategoryFieldChange: (name, value) => dispatch(handleCategoryFieldChange(name, value)),
  updateCategory: () => dispatch(updateCategory())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
