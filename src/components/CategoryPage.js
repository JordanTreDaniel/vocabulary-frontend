import React from 'react'
import CategoryInfo from './CategoryInfo';
import { connect } from 'react-redux';
import TermContainer from './TermContainer';

const mapStateToProps = (state) => {
    return ({
        category: state.categories[state.selectedCategoryIndex]
    })
}

class CategoryPage extends React.Component {
    render = () => {
        return (
            <>
                <CategoryInfo category={this.props.category} {...this.props} />
                <TermContainer cards={this.props.category.cards} />
            </>

        )
    }

}

export default connect(mapStateToProps, null)(CategoryPage);