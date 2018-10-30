import React from 'react';
import CategoryItem from './CategoryItem';
import CategoryList from './CategoryList';
import {Grid, Row, Col } from 'react-bootstrap';
class CategoryPage extends React.Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <CategoryList categories={this.props.categories}/>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <h1>Category Display</h1>
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