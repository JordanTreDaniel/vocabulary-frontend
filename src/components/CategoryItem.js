import React from 'react'

class CategoryItem extends React.Component {
    render() {
        let c = this.props.category;
        return <div id={`category${c.attributes.id}`} class={`category`}>
            <h3>{c.attributes.name}</h3>
            <p>Description: {c.attributes.desc}</p>
        </div>
    }
}

export default CategoryItem;