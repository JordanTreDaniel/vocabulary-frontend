import React from 'react';
import CategoryList from './CategoryList';
import TermContainer from './TermContainer';
import {Grid, Row, Col } from 'react-bootstrap';
class CategoryPage extends React.Component {
   
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <CategoryList categories={this.props.categories} getCategory={id => this.props.getCategory(id)}/>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <TermContainer terms={this.props.terms}/>
                    </Col>
                </Row>
            </Grid>
        )
    }

    componentDidMount() {
        this.props.fetchCategories();
    }
   
}
export default CategoryPage;