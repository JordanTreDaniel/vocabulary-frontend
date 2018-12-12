import React from 'react'
import CategoryInfo from './CategoryInfo';
import { connect } from 'react-redux';

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
            </>

        )
    }

}

export default connect(mapStateToProps, null)(CategoryPage);