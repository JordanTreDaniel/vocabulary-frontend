import React from 'react'
import { Card } from 'semantic-ui-react';

const CategoryListItem = (props) => {
    let { category, index, selectCategory, goToCategory } = props;
    return (
        <Card onClick={() => {
            selectCategory(index).then(res => {
                goToCategory(category.name)
            })

        }} >
            <Card.Content>
                <Card.Header>{category.name}</Card.Header>
            </Card.Content>
        </Card>
    )
}


export default CategoryListItem;