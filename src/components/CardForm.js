import React, { Fragment } from 'react';
import { FormControl } from 'react-bootstrap/lib';
import {
    Button
} from 'react-bootstrap/lib'

const CardForm = (props) => {
    return (
        <Fragment>
            <h3>{props.card.term}</h3>
            <FormControl
                type="text"
                name="term"
                value={props.card.term}
                onChange={(e) => {
                    props.handleCardFieldChange(e, props.idx)
                }}
            />
            <FormControl.Feedback />
            <FormControl
                type="text"
                name="def"
                value={props.card.def}
                onChange={(e) => {
                    props.handleCardFieldChange(e, props.idx)
                }}
            />
            <FormControl.Feedback />
            <FormControl
                type="text"
                name="desc"
                value={props.card.desc}
                onChange={(e) => {
                    props.handleCardFieldChange(e, props.idx)
                }}
            />
            <FormControl.Feedback />
            <Button bsStyle="danger" onClick={() => props.deleteCard(props.card.id)}>Delete Card</Button>

        </Fragment>
    )
}

export default CardForm;