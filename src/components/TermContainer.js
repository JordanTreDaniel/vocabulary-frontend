import React from 'react';
import Term from './Term';
import { Tab, Reveal, Image, Card } from 'semantic-ui-react';

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
                <Term card={card}></Term>
            )
        });

        return (
            <div id="term-container">
                {cards}
            </div>
        );
    }
}

export default TermContainer;