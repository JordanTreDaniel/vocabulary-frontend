
import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';
import Category from '../models/Category';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: null,
            index: props.initialIndex
        }
    }
    render() {
        let categoryItems = this.props.categories.map((category, index) => {
            return (
                <Card onClick={() => this.props.selectCategory(index)}>
                    <Image src={category["img_url"]} />
                    <Card.Content>
                        <Card.Header>{category.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>{category.desc}</Card.Description>
                    </Card.Content>
                </Card>
            )
        });
        return (
            <Grid>
                <Grid.Row style={{ "overflow-x": "scroll", "max-height": 500 }}>
                    <Grid.Column>
                        {categoryItems}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default CategoryList;