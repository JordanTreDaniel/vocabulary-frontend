import React from 'react';
import { Grid, Icon, Popup } from 'semantic-ui-react';
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
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column
                            textAlign="left"
                            floated="left"
                            id="category-pic-and-title"
                        >
                            <div className="category-thumbnail" style={{ backgroundImage: `url(${category['img_url']})` }}></div>
                            <h1>{category.name}</h1>
                        </Grid.Column>
                        {/* <Divider vertical ></Divider> */}
                    </Grid.Row>
                    <Grid.Row divided>
                        <Link to={`/categories`}>
                            <Popup trigger={<Icon size="large" color="green" bordered name="backward" circular></Icon>} content='Back to all categories' />
                        </Link>
                        <Link to={`/categories/${category.id}/edit`}>
                            <Popup trigger={<Icon size="large" color="red" bordered name="pencil" circular></Icon>} content={`Edit ${category.name}`} />
                        </Link>
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