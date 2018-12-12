import React from 'react';
import Term from './Term';
import { Card } from 'semantic-ui-react';

class TermContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1
        };
    }

    handleSelect = (key) => {
        this.setState({ key });
    }

    render() {
        let cards = this.props.cards.map((card, idx) => {
            return (
                <Term card={card} key={idx}></Term>
            )
        });

        return (
            <Card.Group id="term-container">
                {cards}
            </Card.Group>
        );
    }
}

export default TermContainer;