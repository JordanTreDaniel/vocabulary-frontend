import React from 'react';
import Term from './Term';
import { Card, Grid } from 'semantic-ui-react';

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
                <Grid.Column>
                    <Term card={card} key={idx}></Term>
                </Grid.Column>
            )
        });

        return (
            <Grid.Row stretched columns={2}>
                {cards}
            </Grid.Row>
        );
    }
}

export default TermContainer;