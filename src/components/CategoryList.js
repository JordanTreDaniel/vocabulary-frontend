import React from 'react';
class CategoryList extends React.Component {
    render() {
        return (
            <div>
                <h1>Categories</h1>
                {this.props.children}
            </div>
        )
    }
}

export default CategoryList;