import React from 'react'
import { Card } from 'semantic-ui-react';

const CategoryListItem = (props) => {
    let { category, index, selectCategory, goToCategory } = props;
    return (
        <Card
            onClick={() => {
                selectCategory(index).then(res => {
                    goToCategory(category.id)
                })
            }}
            fluid
            color="blue"
            as="div"
            className="term-card"
            raised
            centered
        >
            <Card.Content className="term-card-content">
                <Card.Header>{category.name}</Card.Header>
            </Card.Content>
        </Card>
    )
}


export default CategoryListItem;