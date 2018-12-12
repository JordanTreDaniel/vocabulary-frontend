import React from 'react';
import { Grid } from 'semantic-ui-react'
const CategoryInfo = ({ category }) => {
    return (
        <>
            <div
                className="category-info"
            >
                <Grid>
                    <Grid.Row>
                        <span>{category.cards.length} cards</span>
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