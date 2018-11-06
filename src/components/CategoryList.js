import React from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';
import Button from 'react-bootstrap/lib/Carousel';
import { Link } from "react-router-dom";


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
        this.props.fetchCategory(parseInt(cat.id));
    }
    render() {
        let carouselItems = this.props.categories.map((category, index) => {
            let c = category.attributes;
            return (
                <Carousel.Item 
                    key={index} 
                    id={category.id}
                    className="carousel-item" 
                    style={{backgroundColor: `black`, height: "300px"}}
                >
                    <img src={c['img-url']} alt={c.name}/>
                    <Carousel.Caption>
                        <h3>{c.name}</h3>
                        <p>{c.desc}</p>
                        <Link to={{
                            pathname: `/categories/${category.id}/edit`,
                            state: { category: category }
                        }}>Edit {c.name}</Link>
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