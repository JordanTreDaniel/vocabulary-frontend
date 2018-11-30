import React from 'react';
import CategoryList from './CategoryList';
import CategoryEdit from './CategoryEdit';
import TermContainer from './TermContainer';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import {
    fetchCategories,
    fetchCategory,
    selectCategory
} from '../actions/actions.js'
class CategoryPage extends React.Component {
    render() {
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
                <Route
                    path={`${this.props.match.path}/:id/edit`}
                    exact
                    render={(props) => {
                        return <CategoryEdit
                            fetchCategory={() => this.props.fetchCategory(parseInt(props.match.params.id))}
                            cards={this.props.category.cards}
                            {...props}
                            handleCategoryFieldChange={this.props.handleCategoryFieldChange}
                            handleSubmit={this.props.handleSubmit}
                            handleCardFieldChange={this.props.handleCardFieldChange}
                        />
                    }} />
            </div>
        )
    }
    componentWillMount() {
        this.props.fetchCategories();
    }
}
const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCategory: (id) => dispatch(fetchCategory(id)),
    selectCategory: (idx) => dispatch(selectCategory(idx))
})
const mapStateToProps = (state) => ({
    selectedCategoryIndex: state.selectedCategoryIndex,
    categories: state.categories,
    category: state.categories[state.selectedCategoryIndex]
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);