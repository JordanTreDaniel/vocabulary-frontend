import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'
import CategoryList from './CategoryList';
import TermContainer from './TermContainer';
import { connect } from 'react-redux';
import {
    fetchCategories,
    selectCategory,
} from '../actions/actions.js'


const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    selectCategory: (idx) => dispatch(selectCategory(idx)),
})
const mapStateToProps = (state) => {
    return ({
        selectedCategoryIndex: state.selectedCategoryIndex,
        categories: state.categories,
        category: state.categories[state.selectedCategoryIndex]
    })
}





class CategoryPage extends React.Component {
    componentWillMount = () => {
        this.props.fetchCategories();
    }

    render = () => {
        return (
            <>
                <div id="category-list">
                    <CategoryList
                        categories={this.props.categories}
                        initialIndex={this.props.selectedCategoryIndex}
                        {...this.props}
                    />
                </div>
                <TermContainer cards={this.props.category.cards} />
            </>

        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);