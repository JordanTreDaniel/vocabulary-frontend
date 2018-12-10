
import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import CategoryItem from './CategoryItem';
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

    render = () => {
        let categoryItems = this.props.categories.map((category, index) => {
            return (
                <CategoryItem
                    index={index}
                    category={category}
                    selectCategory={idx => this.props.selectCategory(idx)}
                    key={index}
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