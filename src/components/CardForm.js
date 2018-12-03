import React, { Fragment } from 'react';
import { FormControl } from 'react-bootstrap/lib';
import {
    Button
} from 'react-bootstrap/lib'

const CardForm = (props) => {
    const { card } = props;
    return (
        <Fragment>
            <h3>{card.term}</h3>
            <FormControl
                type="text"
                name="term"
                value={card.term}
                onChange={(e) => {
                    props.handleCardFieldChange(e, props.idx)
                }}
            />
            <FormControl.Feedback />
            <FormControl
                type="text"
                name="def"
                value={card.def}
                onChange={(e) => {
                    props.handleCardFieldChange(e, props.idx)
                }}
            />
            <FormControl.Feedback />
            <FormControl
                type="text"
                name="desc"
                value={card.desc}
                onChange={(e) => {
                    props.handleCardFieldChange(e, props.idx)
                }}
            />
            <FormControl.Feedback />

            {card.id ?
                <Button bsStyle="danger" onClick={() => props.deleteCard(card.id)}>Delete Card</Button>
                :
                null
            }
        </Fragment>
    )
}

export default CardForm;