import React, { Component } from 'react';
import { Route} from "react-router-dom";
import CategoryPage from './components/CategoryPage'
import './assets/stylesheets/App.css';
import {connect } from 'react-redux';
import { setCategories, setCategory } from './actions/actions.js'
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
            let { categories, cards, category } = this.props;
            return <CategoryPage 
              categories={categories}  
              cards={cards}
              category={category}
              props={props}
              fetchCategories={this.fetchCategories}
              fetchCategory={id => this.fetchCategory(id)}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleCardInputChange={this.handleCardInputChange}
            />
        }}/>
      </div>
    );
  }

  handleCardInputChange = (e, idx) => {
    e.persist();
    this.setState((prevState) => {
      return {
        category: {
          ...prevState.category,
          cards: [
            ...prevState.category.cards.slice(0, idx),
            {
              ...prevState.category.cards[idx],
              [e.target.name]: e.target.value
            },
            ...prevState.category.cards.slice(idx+1)
          ]
        }
      }
    });
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
        this.setState({
          categories: res.sort((a, b) => {
            return a.id - b.id
          })
        })
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
const mapStateToProps = (state) => {
   return state;
}

const mapDispatchToProps = (dispatch) => ({
  setCategories: (categoryArr) => dispatch(setCategories(categoryArr)),
  setCategory: (categoryObj) => dispatch(setCategory(categoryObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
