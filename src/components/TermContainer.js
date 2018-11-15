import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Term from './Term';
import Tab from 'react-bootstrap/lib/Tab';

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
                <Tab eventKey={idx} title={card.term} key={card.id}>
                    <Term card={card}/>
                </Tab>
            )
        });

        return (
            <Tabs
            activeKey={this.state.key}
            onSelect={key => this.handleSelect(key)}
            id="controlled-tab-example"
            >
                {cards}
            </Tabs>
        );
    }
}

export default TermContainer;