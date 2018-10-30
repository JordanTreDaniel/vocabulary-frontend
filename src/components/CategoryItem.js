import React from 'react'

class CategoryItem extends React.Component {
    render() {
        let categoryAttr = this.props.category.attributes;  
        let id = this.props.category.id;
        return <div id={`category${id}`} className={`category`}>
            <h3>{categoryAttr.name}</h3>
            <img src={categoryAttr["img-url"]} alt={`${categoryAttr.name} logo.`}/>
            <p>Description: {categoryAttr.desc}</p>
        </div>
    }
}

export default CategoryItem;