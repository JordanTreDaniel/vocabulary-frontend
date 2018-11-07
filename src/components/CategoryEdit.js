import React from 'react';
import {    FormGroup, 
            FormControl, 
            FormExample,
            ControlLabel,
            HelpBlock,
            Button
        } from 'react-bootstrap/lib'
import { Redirect} from "react-router-dom";
    
export default class CategoryEdit extends React.Component {
    constructor(props, context) {
      super(props, context);
    }

    getValidationState() {
      return  null;
    }
    handleSubmit = (event) => {
      event.preventDefault();
      console.log("in the handle submit", this.props.category)
      this.props.handleSubmit();
    }
    render() {
      return this.props.category ? (
        <form onSubmit={this.handleSubmit}>
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
            <ControlLabel>Category Image URL</ControlLabel>
            <FormControl
              type="text"
              name="img-url"
              value={this.props.category.attributes["img-url"]}
              placeholder="Enter text"
              onChange={this.props.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
          <Button bsStyle="primary" type="submit">Save Changes</Button>
        </form>
      ) : <Redirect to="/categories"/>;
    }
  }
  