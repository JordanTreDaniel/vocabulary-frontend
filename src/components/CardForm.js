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
            <FormControl
                type="text"
                name="term"
                value={props.card.term}
                onChange={props.handleCardInputChange}
                />
            <FormControl.Feedback />
        </Fragment>
    )
}

export default CardForm;