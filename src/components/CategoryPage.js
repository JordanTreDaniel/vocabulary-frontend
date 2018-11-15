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
                                        <TermContainer cards={this.props.cards}/>
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
                        cards={this.props.cards}
                        {...props}
                        handleChange={this.props.handleChange}
                        handleSubmit={this.props.handleSubmit}
                        handleCardInputChange={this.props.handleCardInputChange}
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