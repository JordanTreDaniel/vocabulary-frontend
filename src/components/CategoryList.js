
import React from 'react';
import { Card, Icon, Grid, Button } from 'semantic-ui-react';
import CategoryListItem from './CategoryListItem';
import {
    fetchCategories,
    selectCategory,
} from '../actions/actions.js'
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    selectCategory: (idx) => dispatch(selectCategory(idx)),
})
class CategoryList extends React.Component {

    createCategory = () => {
        this.props.history.push('/categories/new')
    }
    goToCategory = (name) => {
        this.props.history.push(`categories/${name}`)
    }
    render = () => {
        let categoryItems = this.props.categories.map((category, index) => {
            return (
                <Grid.Column>
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
                <Grid
                    container
                    stackable
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
            </>
        )
    }
}

export default connect(null, mapDispatchToProps)(CategoryList);