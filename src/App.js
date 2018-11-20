import React, { Component } from 'react';
import { Route} from "react-router-dom";
import CategoryPage from './components/CategoryPage'
import './assets/stylesheets/App.css';
class App extends Component {
  render() {
    return (
      <div className="app-page-container">
        <Route 
          path={`${this.props.match.path}/categories`} 
          render={(props) => {
            return <CategoryPage {...props}/>
        }}/>
      </div>
    );
  }
}

export default App;
