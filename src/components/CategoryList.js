import React from 'react';
import Button from 'react-bootstrap/lib/Button';
class CategoryList extends React.Component {
    render() {
        return (
            <div>
                <h1>Categories</h1>
                {this.props.children}
                <Button bsStyle="success">Success</Button>
            </div>
        )
    }
}

export default CategoryList;