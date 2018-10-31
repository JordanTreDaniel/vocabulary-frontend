import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const AppRouter = () => {
    return <Router>
                <>
                    <Link to="/home">Home</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/tags">Tags</Link>
                    <Link to="/terms">Terms</Link>
                    <Route path="/home" component={App}/>
                    <Route path="/categories" component={App}/>
                </>
            </Router>
}

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
