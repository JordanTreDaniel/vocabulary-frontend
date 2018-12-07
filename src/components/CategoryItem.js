import React from 'react'
import Carousel from 'react-bootstrap/lib/Carousel';

const CategoryItem = (props) => {
    let { category } = this.props
    return (
        <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={category["img_url"]} />
            <Carousel.Caption>
                <h3>{category.name}</h3>
                <p>{category.desc}</p>
            </Carousel.Caption>
        </Carousel.Item>
    )
}


export default CategoryItem;