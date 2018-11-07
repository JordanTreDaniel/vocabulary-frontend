import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import CategoryPage from './components/CategoryPage'

import './assets/stylesheets/App.css';
import Category from './models/Category';

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
    this.setState({
      category: {
        attributes: {
          [e.target.name]: e.target.value
        }
      }
    })
  }
  handleSubmit = (e, catId) => {
    debugger
    e.preventDefault();
    let data = {
      name: e.target.name.value,
      desc: e.target.desc.value,
      "img-url": e.target['img-url'].value
    }
    debugger;
    this.updateCategory(data, catId)
  }
  updateCategory = (payload, catId) => {
    fetch(`http://localhost:3000/api/v1/categories/${catId}`, {
      method: "PATCH",
      body: JSON.stringify(payload)
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
    fetch(`http://localhost:3000/api/v1/categories/${id}`)
    .then(res => res.json())
    .then(res => {
      debugger
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
    fetch("http://localhost:3000/api/v1/categories")
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
