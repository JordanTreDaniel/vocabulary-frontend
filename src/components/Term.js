import React from 'react';
import Tab from 'react-bootstrap/lib/Tab';

class Term extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let term = this.props.term.attributes;
        return (
            <div class="term-card">
                <h2>{term.term}</h2>
                <p><strong>{term.term}</strong> - {term.def}</p>
                <small>{term.desc}</small>
            </div>
        )
    }
}
export default Term;