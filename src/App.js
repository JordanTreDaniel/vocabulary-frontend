import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import CategoryPage from './components/CategoryPage'

import './assets/stylesheets/App.css';
import Term from './models/Term';
import Category from './models/Category';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      terms: [],
      category: new Category()
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
            />
        }}/>
      </div>
    );
  }
  fetchCategory = (id) => {
    fetch(`http://localhost:3000/api/v1/categories/${id}`)
    .then(res => res.json())
    .then(res => {
      if (res.included === undefined) {
        this.setState({
          terms: [],
          category: res.data
        })
      } else {
        this.setState({
          terms: res.included.map((obj) => {
            return new Term(obj.attributes.term, obj.attributes.def, obj.attributes.desc, obj.id);
          }),
          category: res.data
        })
      }
        this.setState({
          
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
          categories: res.data.map((c) => {
            return new Category(c.attributes.name, c.attributes.desc, c.attributes["img-url"], c.id)
          }),
          category: res.data[0]
        })
      })
      .catch(err => {
        throw err;
      })
  }
}

export default App;
