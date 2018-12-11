import React from 'react'
import Carousel from 'react-bootstrap/lib/Carousel';
import { Grid, Image, Card, Icon } from 'semantic-ui-react';

const CategoryItem = (props) => {
    let { category, index, selectCategory } = props;
    return (
        <Card onClick={() => selectCategory(index)} >
            <Card.Content>
                <Card.Header>{category.name}</Card.Header>
            </Card.Content>
        </Card>
    )
}


export default CategoryItem;