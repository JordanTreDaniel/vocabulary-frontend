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
            return {
                menuItem: card.term, render: () => {
                    return (
                        <Tab.Pane>
                            <Term card={card}></Term>
                        </Tab.Pane>
                    )
                }
            }
        });

        return (
            <Tab
                activeIndex={this.state.key}
                onTabChange={(e, data) => this.handleSelect(data.activeIndex)}
                panes={cards}
                menu={{ pointing: true }}
            >
                {cards}
            </Tab >
        );
    }
}

export default TermContainer;