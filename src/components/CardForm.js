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
                onChange={(e) => {
                    props.handleCardInputChange(e, props.idx)
                }}
                />
            <FormControl.Feedback />
            <FormControl
                type="text"
                name="def"
                value={props.card.def}
                onChange={(e) => {
                    props.handleCardInputChange(e, props.idx)
                }}
                />
            <FormControl.Feedback />
            <FormControl
                type="text"
                name="desc"
                value={props.card.desc}
                onChange={(e) => {
                    props.handleCardInputChange(e, props.idx)
                }}
                />
            <FormControl.Feedback />
        </Fragment>
    )
}

export default CardForm;