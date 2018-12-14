import React from 'react'
import CategoryInfo from './CategoryInfo';
import { connect } from 'react-redux';
import TermContainer from './TermContainer';
import { Grid } from 'semantic-ui-react';

const mapStateToProps = (state) => {
    return ({
        category: state.categories[state.selectedCategoryIndex]
    })
}

class CategoryPage extends React.Component {
    render = () => {
        return (
            <>
                <Grid container stackable divided="vertically" className="category-and-cards-container">
                    <Grid.Row>
                        <CategoryInfo category={this.props.category} {...this.props} />
                    </Grid.Row>
                    <TermContainer cards={this.props.category.cards} />
                </Grid>
            </>

        )
    }

}

export default connect(mapStateToProps, null)(CategoryPage);