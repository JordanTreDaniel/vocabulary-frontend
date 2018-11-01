import React from 'react';
import CategoryList from './CategoryList';
import CategoryEdit from './CategoryEdit';
import TermContainer from './TermContainer';
import {Grid, Row, Col } from 'react-bootstrap';
import { Route } from "react-router-dom";

class CategoryPage extends React.Component {
   constructor(props) {
       super(props);
   }
    render() {
        // debugger;
        return (
            <div id="category-page-container">
                <Route 
                    path={`${this.props.props.match.path}`} 
                    exact 
                    render={(props) => {
                        return (
                            <Grid>
                                <Row className="show-grid">
                                    <Col xs={12} md={12}>
                                        <CategoryList categories={this.props.categories} fetchCategory={id => this.props.fetchCategory(id)}/>
                                    </Col>
                                </Row>
                                <Row className="show-grid">
                                    <Col xs={12} md={12}>
                                        <TermContainer terms={this.props.terms}/>
                                    </Col>
                                </Row>
                            </Grid>
                        )
                    }}/>
                <Route 
                    path={`${this.props.props.match.path}/:id/edit`} 
                    exact 
                    render={(props) => {
                        return <CategoryEdit 
                        fetchCategory={() => this.props.fetchCategory(parseInt(props.match.params.id))}
                        category={this.props.category}
                        terms={this.props.terms}
                        />
                }}/>
            </div>  
        )
    }

    componentDidMount() {
        this.props.fetchCategories();
    }
   
}
export default CategoryPage;