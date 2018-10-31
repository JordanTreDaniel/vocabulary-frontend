import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CategoryPage from './components/CategoryPage'

import './assets/stylesheets/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      terms: []
    }
  }
  render() {
    return (
      <div className="App">
        <Route path={`${this.props.match.path}/:id`} render={() => {
          return <CategoryPage 
            fetchCategories={this.fetchCategories}
            categories={this.state.categories}  
            terms={this.state.terms}
            getCategory={id => this.fetchCategory(id)}
          />
        }}/>
      </div>
    );
  }
  fetchCategory = (id) => {
    fetch(`http://localhost:3000/api/v1/categories/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          terms: res.included === undefined ? [] : res.included
        })
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
          categories: res.data
        })
      })
      .catch(err => {
        throw err;
      })
  }
}

export default App;
