import React from 'react';
import Tab from 'react-bootstrap/lib/Tab';

class Term extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let term = this.props.term;
        return (
        <Tab eventkey={term.id} title={term.attributes.term} >
            {term.attributes.term}
        </Tab>)
    }
}
export default Term;