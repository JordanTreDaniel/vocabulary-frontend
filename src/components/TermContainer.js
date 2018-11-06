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
        let terms = this.props.terms.map((term, idx) => {
            console.log(term)
            return (
                <Tab eventKey={idx} title={term.attributes.term} key={term.id}>
                    <Term term={term}/>
                </Tab>
            )
        });

        return (
            <Tabs
            activeKey={this.state.key}
            onSelect={key => this.handleSelect(key)}
            id="controlled-tab-example"
            >
                {terms}
            </Tabs>
        );
    }
}

export default TermContainer;