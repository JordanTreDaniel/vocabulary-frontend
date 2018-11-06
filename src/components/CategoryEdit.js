import React from 'react';
import {    FormGroup, 
            FormControl, 
            FormExample,
            ControlLabel,
            HelpBlock,
        } from 'react-bootstrap/lib'
    
export default class CategoryEdit extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
          // category: this.props.category,
      }
    }
    // componentDidMount() {
    //     this.props.fetchCategory();
    // }

    getValidationState() {
      return  null;
    }
  
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    render() {
      // let that = this;
      // debugger
      return (
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
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <ControlLabel>Category Description</ControlLabel>
            <FormControl
              type="text"
              name="description"
              value={this.props.category.attributes.name}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
      );
    }
  }
  