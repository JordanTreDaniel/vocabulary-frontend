import React from 'react';
import {    FormGroup, 
            FormControl, 
            FormExample,
            ControlLabel,
            HelpBlock,
        } from 'react-bootstrap/lib'
import { Redirect} from "react-router-dom";
    
export default class CategoryEdit extends React.Component {
    constructor(props, context) {
      super(props, context);
    }

    getValidationState() {
      return  null;
    }

    render() {
      return this.props.category ? (
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Category Name</ControlLabel>
            <FormControl
              type="text"
              name="name"
              value={this.props.category.attributes.name}
              placeholder="Enter text"
              onChange={this.props.handleChange}
            />
            <FormControl.Feedback />
            <ControlLabel>Category Description</ControlLabel>
            <FormControl
              type="text"
              name="desc"
              value={this.props.category.attributes.desc}
              placeholder="Enter text"
              onChange={this.props.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
      ) : <Redirect to="/categories"/>;
    }
  }
  