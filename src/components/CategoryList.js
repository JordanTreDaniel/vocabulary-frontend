import React from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';
import CategoryItem from './CategoryItem';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: null,
            index: 0
        }
    }
    handleSelect = (selectedIndex, e) => {
        e.persist();
        this.setState({
            direction: e.direction,
            index: selectedIndex
        })
        this.findSelectedCategory(selectedIndex);
    }
    findSelectedCategory = (idx) => {
        let cat = this.props.categories[idx];
        this.props.getCategory(parseInt(cat.id));
    }
    render() {
        let carouselItems = this.props.categories.map((category, index) => {
            return (
                <Carousel.Item 
                    key={index} 
                    id={category.id}
                    className="carousel-item" 
                    style={{backgroundImage: `url("${category.attributes["img-url"]}")`, height: "300px"}}
                    
                >
                    <Carousel.Caption>
                        <h3>{category.attributes.name}</h3>
                        <p>{category.attributes.desc}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        });
        return (
            < Carousel
                activeIndex={this.state.index}
                direction={this.state.direction}
                onSelect={(key, event) => {
                    return this.handleSelect(key, event)}
                }
            >
                {carouselItems}
            </ Carousel>
        )
    }
}

export default CategoryList;