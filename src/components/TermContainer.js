import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Term from './Term';
class TermContainer extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        key: 1
      };
    }
  
    handleSelect(key) {
      alert(`selected ${key}`);
      this.setState({ key });
    }
  
    render() {
        debugger
        let terms = this.props.terms.map((term) => {
            return <Term term={term} key={term.id}/>
        });

        return (
            <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
            >
            {terms}
            </Tabs>
        );
    }
}

export default TermContainer;