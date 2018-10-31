import React from 'react';

let Term = (props) => {
        let term = props.term;
        return (
            <div className={"term-card"}>
                <h2>{term.term}</h2>
                <p><strong>{term.term}</strong> - {term.def}</p>
                <small>{term.desc}</small>
            </div>
        )
}
export default Term;