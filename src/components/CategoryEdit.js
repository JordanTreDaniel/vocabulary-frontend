import React from 'react';
export default class CategoryEdit extends React.Component {
    componentDidMount() {
        this.props.fetchCategory();
    }
    // componentDidUpdate() {
    //     this.props.fetchCategory();
    // }
    render() {
        debugger
        return <h1>The name{this.props.category.attributes.name}</h1>
    }
}