
import React from 'react';
import { Icon, Grid, Button } from 'semantic-ui-react';
import CategoryListItem from './CategoryListItem';
import LoadingIcon from './LoadingIcon';
import {
    fetchCategories,
    selectCategory,
    createCategory,
    categoriesAreLoading,
} from '../actions/actions.js'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return ({
        selectedCategoryIndex: state.selectedCategoryIndex,
        categories: state.categories,
        loading: state.loading,
        errors: state.errors
    })
}
const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    selectCategory: (idx) => dispatch(selectCategory(idx)),
    createCategory: () => dispatch(createCategory()),
    categoriesAreLoading: () => dispatch(categoriesAreLoading()),
})
class CategoryList extends React.Component {
    componentWillMount = () => {
        this.props.categoriesAreLoading();
        this.props.fetchCategories();
    }
    createCategory = () => {
        this.props.createCategory();
        this.props.history.push('/categories/new')
    }
    goToCategory = (name) => {
        this.props.history.push(`categories/${name}`)
    }
    render = () => {
        let categoryItems = this.props.categories.map((category, index) => {
            return (
                <Grid.Column key={index}>
                    <CategoryListItem
                        index={index}
                        category={category}
                        selectCategory={idx => this.props.selectCategory(idx)}
                        key={index}
                        goToCategory={name => this.goToCategory(name)}
                    />
                </Grid.Column>
            )
        });
        return (

            <>
                {
                    this.props.loading ?
                        <LoadingIcon />
                        :
                        <Grid
                            container
                            stackable
                            divided="vertically"
                            className="category-and-cards-container"
                        >
                            <Grid.Row columns={2} stretched>
                                <Grid.Column>
                                    <Button fluid basic color='green' onClick={() => this.createCategory()}>
                                        <h3>New Category</h3>
                                        <br></br>
                                        <Icon name="plus" circular size="big" />
                                    </Button>
                                </Grid.Column>
                                {categoryItems}
                            </Grid.Row>
                        </Grid>
                }
            </>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);