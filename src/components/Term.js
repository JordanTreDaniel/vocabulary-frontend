import React from 'react';

let Term = (props) => {
    let { def, desc, term } = props.card;
    return (
        <div className={"term-card"}>
            <h2>{term}</h2>
            <p><strong>{term}</strong> - {def}</p>
            <small>{desc}</small>
        </div>
    )
}
export default Term;