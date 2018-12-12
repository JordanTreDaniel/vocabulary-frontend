
import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
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
                <CategoryListItem
                    index={index}
                    category={category}
                    selectCategory={idx => this.props.selectCategory(idx)}
                    key={index}
                    goToCategory={name => this.goToCategory(name)}
                />
            )
        });
        return (
            <>
                <Card onClick={() => this.createCategory()}>
                    <Card.Content>
                        <Card.Header>
                            <Icon name="plus circle" className="category-list-image" />
                            Add a Category
                        </Card.Header>
                    </Card.Content>
                </Card>
                {categoryItems}
            </>
        )
    }
}

export default connect(null, mapDispatchToProps)(CategoryList);