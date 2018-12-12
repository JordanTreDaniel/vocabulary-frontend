import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const CategoryInfo = ({ category }) => {
    return (
        <>
            <div
                className="category-info"
            >
                <Grid>
                    <Grid.Row>

                        <Grid.Column>
                            <span>{category.cards.length} cards</span>
                        </Grid.Column>
                        <Grid.Column floated="right" textAlign="center">
                            <Link to={`/categories/${category.id}/edit`}>
                                <h4>Edit {category.name}<Icon name="pencil"></Icon></h4>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={12} divided>
                        <Grid.Column width={2}>
                            <div className="category-thumbnail" style={{ backgroundImage: `url(${category['img_url']})` }}></div>
                        </Grid.Column>
                        <Grid.Column width={10} textAlign="left" verticalAlign="middle">
                            <h1>{category.name}</h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <p>{category.desc}</p>
                    </Grid.Row>
                </Grid>
            </div>
        </>
    )
}

export default CategoryInfo;