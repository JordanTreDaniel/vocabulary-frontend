import React, {Fragment} from 'react';
import {    FormGroup, 
            FormControl, 
            FormExample,
            ControlLabel,
            HelpBlock,
            Button
        } from 'react-bootstrap/lib'
import { Redirect} from "react-router-dom";

const CardForm = (props) => {
    return (
        <Fragment>
            <h3>{props.card.term}</h3>
            <FormControl
                type="text"
                name="term"
                value={props.card.term}
                onChange={props.handleCardInputChange}
                />
            <FormControl.Feedback />
            <FormControl
                type="text"
                name="def"
                value={props.card.def}
                onChange={props.handleCardInputChange}
                />
            <FormControl.Feedback />
            <FormControl
                type="text"
                name="desc"
                value={props.card.desc}
                onChange={props.handleCardInputChange}
                />
            <FormControl.Feedback />
        </Fragment>
    )
}

export default CardForm;