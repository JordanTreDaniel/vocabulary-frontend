import React from 'react';
import {    FormGroup, 
            FormControl, 
            ControlLabel,
            HelpBlock,
            Button
        } from 'react-bootstrap/lib'
import { Redirect } from "react-router-dom";
import CardForm from './CardForm';
import {connect } from 'react-redux';

import { 
  handleCardFieldChange,
  handleCategoryFieldChange,
  updateCategory
 } from '../actions/actions.js'
class CategoryEdit extends React.Component {
    getValidationState() {
      return  null;
    }
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.handleSubmit();
    }
    renderCardForms = () => {
      return this.props.category.cards.map((c, idx) => {
        return (
          <CardForm 
            card={c} 
            handleCardFieldChange={this.handleCardFieldChange}
            key={idx}
            idx={idx}
          />
        )
      })
    }
    handleCardFieldChange = (e, idx) => {
      e.persist();
      let {name, value} = e.target;
      this.props.handleCardFieldChange(name, value, idx);
    }
    handleCategoryFieldChange = (e) => {
      e.persist();
      let {name, value} = e.target;
      this.props.handleCategoryFieldChange(name, value);
    }

    handleSubmit = (event) => {
      this.props.updateCategory(this.props.category);
      this.props.history.push('/categories')
    }
    render() {
      debugger
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
              value={this.props.category.name}
              placeholder="Enter text"
              onChange={this.handleCategoryFieldChange}
            />
            <FormControl.Feedback />
            <ControlLabel>Category Description</ControlLabel>
            <FormControl
              type="text"
              name="desc"
              value={this.props.category.desc}
              placeholder="Enter text"
              onChange={this.handleCategoryFieldChange}
            />
            <FormControl.Feedback />
            <ControlLabel>Category Image URL</ControlLabel>
            <FormControl
              type="text"
              name="img_url"
              value={this.props.category["img_url"]}
              placeholder="Enter text"
              onChange={this.handleCategoryFieldChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
            {this.renderCardForms()}
          </FormGroup>
          <Button bsStyle="primary" type="submit">Save Changes</Button>
        </form>
      ) : <Redirect to="/categories"/>;
    }
  }
  const mapDispatchToProps = (dispatch) => ({
    handleCardFieldChange: (name, value, idx) => dispatch(handleCardFieldChange(name, value, idx)),
    handleCategoryFieldChange: (name, value) => dispatch(handleCategoryFieldChange(name, value)),
    updateCategory: (category) => dispatch(updateCategory(category))
})
const mapStateToProps = (state) => ({
    category: state.categories[state.selectedCategoryIndex],
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);
