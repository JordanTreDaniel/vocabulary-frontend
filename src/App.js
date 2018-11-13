import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import CategoryPage from './components/CategoryPage'

import './assets/stylesheets/App.css';
import Category from './models/Category';
const API = 'https://codecabulary.herokuapp.com/api/v1';
const LOCAL = `http://localhost:3000/api/v1`
class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      terms: [],
    }
  }
  render() {
    return (
      <div className="app-page-container">
        <Route 
          path={`${this.props.match.path}/categories`} 
          render={(props) => {
            return <CategoryPage 
              fetchCategories={this.fetchCategories}
              categories={this.state.categories}  
              terms={this.state.terms}
              fetchCategory={id => this.fetchCategory(id)}
              props={props}
              category={this.state.category}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
        }}/>
      </div>
    );
  }
  handleChange = (e) => {
    e.preventDefault();
    e.persist();
    this.setState(prevState => {
      return {
        category: {
          ...prevState.category,
          attributes: {
            ...prevState.category.attributes,
            [e.target.name]: e.target.value
          },
        },
      }
    }, console.log(this.state))
  }
  handleSubmit = (event) => {
    this.updateCategory();
  }
  updateCategory = () => {
    fetch(`${LOCAL}/categories/${this.state.category.id}`, {
      method: "PATCH",
      body: JSON.stringify(this.state.category),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => {
      res.json();
    })
    .then(category => {
      this.setState({
        category: category
      })
    })
    .catch(err => {
      debugger;
    })
  }
  fetchCategory = (id) => {
    fetch(`${LOCAL}/categories/${id}`)
    .then(res => res.json())
    .then(res => {
      if (res.included === undefined) {
        this.setState({
          terms: [],
          category: res.data
        })
      } else {
        this.setState({
          terms: res.included,
          category: res.data
        })
      }
    })
    .catch(err => {
      throw err;
    })
  }
  fetchCategories = () => {
    fetch(`${LOCAL}/categories`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          categories: res.data,
          category: res.data[0]
        })
      })
      .catch(err => {
        throw err;
      })
  }
}


export default App;
