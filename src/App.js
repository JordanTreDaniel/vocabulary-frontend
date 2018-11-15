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
      cards: [],
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
              cards={this.state.cards}
              fetchCategory={id => this.fetchCategory(id)}
              props={props}
              category={this.state.category}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleCardInputChange={this.handleCardInputChange}
            />
        }}/>
      </div>
    );
  }
  handleCardInputChange = (e) => {
    e.persist();
    console.log(e);
  }
  handleChange = (e) => {
    e.preventDefault();
    e.persist();
    this.setState(prevState => {
      return {
        category: {
          ...prevState.category,
          [e.target.name]: e.target.value
        },
      }
    })
  }
  handleSubmit = (event) => {
    this.updateCategory();
  }
  updateCategory = () => {
    // debugger
    fetch(`${LOCAL}/categories/${this.state.category.id}`, {
      method: "PATCH",
      body: JSON.stringify(this.state.category),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(category => {
      this.setState(prevState => {
        let cats = prevState.categories;
        let oldCategory = cats.find((cat) => {
          return cat.id === category.id;
        })
        cats[cats.indexOf(oldCategory)] = category;
        return {
          category: category,
          categories: cats
        }
      })
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
      this.setState({
        category: res,
        cards: res.cards
      })
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
          categories: res.sort((a, b) => {
            return a.id - b.id
          }),
          category: res[0]
        })
      })
      .catch(err => {
        throw err;
      })
  }
}


export default App;
