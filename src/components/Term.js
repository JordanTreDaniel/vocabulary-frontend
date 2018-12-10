import React from 'react';
import { Card } from 'semantic-ui-react'
class Term extends React.Component {
    constructor() {
        super();
        this.state = {
            display: false
        }
    }
    toggleDisplay = () => {
        this.setState((prevState) => {
            return {
                display: !prevState.display
            }
        })
    }
    render = () => {
        const { card } = this.props;
        const content = (
            this.state.display ?
                <Card.Content
                    className="term-card-content"
                    textAlign="center"
                >
                    <Card.Header>{card.term}</Card.Header>
                    <Card.Description>{card.def}</Card.Description>
                </Card.Content>
                :
                <Card.Content className="term-card-content">
                    <Card.Header>{card.term}</Card.Header>
                </Card.Content>
        )
        return (
            <Card
                as="div"
                onClick={this.toggleDisplay}
                className="term-card"
                raised
            >
                {content}
            </Card >
        )
    }
}
export default Term;