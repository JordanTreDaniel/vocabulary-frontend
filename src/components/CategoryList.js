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
        this.findSelectedCategory(e);
    }
    findSelectedCategory = (event) => {
        let id = parseInt(document.getElementsByClassName("carousel-item item active")[0].id);
        event.direction === "next" ? id++ : id--
        this.props.getCategory(id);
    }
    render() {
        let carouselItems = this.props.categories.map((category, index) => {
            return (
                <Carousel.Item key={index} id={category.id}className="carousel-item" style={{backgroundImage: `url("${category.attributes["img-url"]}")`, height: "300px"}}>
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
                onChange={(event) => {
                    return this.findSelectedCategory(event);
                }}
            >
                {carouselItems}
            </ Carousel>
        )
    }
}

export default CategoryList;