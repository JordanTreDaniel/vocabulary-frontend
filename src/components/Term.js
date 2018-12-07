import React from 'react';
import { Tab, Card } from 'semantic-ui-react'
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
        return (
            this.state.display ?
                <Card onClick={this.toggleDisplay}>
                    <Card.Content>
                        <Card.Header>{card.term}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>{card.def}</Card.Description>
                    </Card.Content>
                </Card >
                :
                <Card onClick={this.toggleDisplay}>
                    <Card.Content>
                        <Card.Header>{card.term}</Card.Header>
                    </Card.Content>
                </Card >
        )
    }
}
export default Term;