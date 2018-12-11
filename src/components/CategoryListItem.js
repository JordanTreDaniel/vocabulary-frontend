import React from 'react'
import { Card } from 'semantic-ui-react';

const CategoryListItem = (props) => {
    let { category, index, selectCategory } = props;
    return (
        <Card onClick={() => selectCategory(index)} >
            <Card.Content>
                <Card.Header>{category.name}</Card.Header>
            </Card.Content>
        </Card>
    )
}


export default CategoryListItem;