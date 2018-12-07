import { Button } from 'semantic-ui-react';
import React from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';
import { Link } from "react-router-dom";


class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: null,
            index: props.initialIndex
        }
    }
    handleSelect = (selectedIndex, e) => {
        this.setState({
            direction: e.direction,
            index: selectedIndex
        })
        this.props.selectCategory(selectedIndex);
    }
    render() {
        let carouselItems = this.props.categories.map((category, index) => {
            return (
                <Carousel.Item
                    key={index}
                    id={category.id}
                    className="carousel-item"
                    style={{ backgroundColor: `black`, height: "300px" }}
                >
                    <img src={category['img_url']} alt={category.name} />
                    <Carousel.Caption>
                        <h3>{category.name}</h3>
                        <p>{category.desc}</p>
                        <Link to={{
                            pathname: `/categories/${category.id}/edit`,
                            state: { category: category }
                        }}>Edit {category.name}</Link>
                        <Button>Click Here</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        });
        return (
            < Carousel
                activeIndex={this.state.index}
                direction={this.state.direction}
                onSelect={(key, event) => {
                    return this.handleSelect(key, event)
                }
                }
            >
                {carouselItems}
            </ Carousel>
        )
    }
}

export default CategoryList;