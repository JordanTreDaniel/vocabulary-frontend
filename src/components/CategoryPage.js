import React from 'react';
import CategoryList from './CategoryList';
import TermContainer from './TermContainer';
import { Grid, Row, Col } from 'react-bootstrap';
import {
    Button
} from 'react-bootstrap/lib'
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import {
    fetchCategories,
    selectCategory,
    createCategory
} from '../actions/actions.js'


const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    selectCategory: (idx) => dispatch(selectCategory(idx)),
    createCategory: () => dispatch(createCategory())
})
const mapStateToProps = (state) => {
    return ({
        selectedCategoryIndex: state.selectedCategoryIndex,
        categories: state.categories,
        category: state.categories[state.selectedCategoryIndex]
    })
}


class CategoryPage extends React.Component {
    componentWillMount() {
        this.props.fetchCategories();
    }

    createCategory = () => {
        this.props.createCategory();
        this.props.history.push('/categories/new')
    }
    render() {
        debugger
        return (
            <div id="category-page-container">
                <Route
                    path={`${this.props.match.path}`}
                    exact
                    render={(props) => {
                        return (
                            <Grid>
                                <Row className="show-grid">
                                    <Col xs={12} md={12}>
                                        <Button bsStyle="success" onClick={this.createCategory}>New Category</Button>
                                    </Col>
                                </Row>
                                <Row className="show-grid">
                                    <Col xs={12} md={12}>
                                        <CategoryList
                                            categories={this.props.categories}
                                            selectCategory={id => this.props.selectCategory(id)}
                                            initialIndex={this.props.selectedCategoryIndex}
                                        />
                                    </Col>
                                </Row>
                                <Row className="show-grid">
                                    <Col xs={12} md={12}>
                                        <TermContainer cards={this.props.category.cards} />
                                    </Col>
                                </Row>
                            </Grid>
                        )
                    }} />
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);