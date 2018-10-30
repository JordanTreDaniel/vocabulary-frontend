import React from 'react'
import Carousel from 'react-bootstrap/lib/Carousel';

class CategoryItem extends React.Component {
    render() {
        let categoryAttr = this.props.category.attributes;  
        let id = this.props.category.id;
        return (
            <Carousel.Item>
                <img width={900} height={500} alt="900x500" src={categoryAttr["img-url"]} />
                <Carousel.Caption>
                    <h3>{categoryAttr.name}</h3>
                    <p>{categoryAttr.desc}</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }
}

export default CategoryItem;