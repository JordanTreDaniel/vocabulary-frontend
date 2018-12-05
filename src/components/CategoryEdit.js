import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button
} from 'react-bootstrap/lib'
import { Redirect } from "react-router-dom";
import CardForm from './CardForm';
import { connect } from 'react-redux';

import {
  handleCardFieldChange,
  handleCategoryFieldChange,
  updateCategory,
  addCard,
  deleteCard,
  deleteCategory,
  selectCategoryById,
  fetchCategory,
  createCategory

} from '../actions/actions.js'

const mapDispatchToProps = (dispatch) => ({
  handleCardFieldChange: (name, value, idx) => dispatch(handleCardFieldChange(name, value, idx)),
  handleCategoryFieldChange: (name, value) => dispatch(handleCategoryFieldChange(name, value)),
  updateCategory: (category) => dispatch(updateCategory(category)),
  addCard: () => dispatch(addCard()),
  deleteCard: (id) => dispatch(deleteCard(id)),
  deleteCategory: (id) => deleteCategory(id),
  selectCategoryById: (id) => dispatch(selectCategoryById(id)),
  fetchCategory: (id) => dispatch(fetchCategory(id)),
  createCategory: () => dispatch(createCategory())
})
const mapStateToProps = (state) => ({
  category: state.categories[state.selectedCategoryIndex],
})

class CategoryEdit extends React.Component {
  getValidationState() {
    return null;
  }
  goToCategories = () => {
    this.props.history.push('/categories')
  }

  addCard = () => {
    this.props.addCard();
    this.forceUpdate();
  }
  deleteCard = (id) => {
    this.props.deleteCard(id)
      .then(res => {
        this.forceUpdate();
        console.log(res.message)
      });
  }
  deleteCategory = (id) => {
    this.props.deleteCategory(id)
      .then(() => {
        this.goToCategories();
      });

  }
  handleCardFieldChange = (e, idx) => {
    e.persist();
    let { name, value } = e.target;
    this.props.handleCardFieldChange(name, value, idx);
  }
  handleCategoryFieldChange = (e) => {
    e.persist();
    let { name, value } = e.target;
    this.props.handleCategoryFieldChange(name, value);
  }

  handleSubmit = (event) => {
    this.props.updateCategory(this.props.category)
      .then(() => {
        this.goToCategories();
      });
  }


  componentWillMount = () => {
    debugger
    const { url } = this.props.match;
    if (url === "/categories/new") {
      this.props.createCategory();
    }   //else if (url === `/categories/${this.props.category.id}/edit`) {
    //   this.props.fetchCategory(parseInt(this.props.match.params.id))
    // }
  }
  renderCardForms = () => {
    return this.props.category.cards.map((c, idx) => {
      return (
        <CardForm
          card={c}
          handleCardFieldChange={this.handleCardFieldChange}
          key={idx}
          idx={idx}
          deleteCard={(id) => this.deleteCard(id)}
        />
      )
    })
  }
  render() {
    const { category } = this.props;
    return category ? (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Category Name</ControlLabel>
          <FormControl
            type="text"
            name="name"
            value={category.name}
            placeholder="Enter text"
            onChange={this.handleCategoryFieldChange}
          />
          <FormControl.Feedback />
          <ControlLabel>Category Description</ControlLabel>
          <FormControl
            type="text"
            name="desc"
            value={category.desc}
            placeholder="Enter text"
            onChange={this.handleCategoryFieldChange}
          />
          <FormControl.Feedback />
          <ControlLabel>Category Image URL</ControlLabel>
          <FormControl
            type="text"
            name="img_url"
            value={category["img_url"]}
            placeholder="Enter text"
            onChange={this.handleCategoryFieldChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
          {this.renderCardForms()}
          <Button bsStyle="primary" onClick={this.addCard}>New Card</Button>
        </FormGroup>
        <Button bsStyle="success" onClick={this.handleSubmit}>Save Changes</Button>
        {/* Only show delete button if the category has been saved to db */}
        {category.id ?
          <Button bsStyle="danger" onClick={() => this.deleteCategory(category.id)}>Delete {category.name}</Button>
          :
          null
        }
      </form>
    ) : <Redirect to="/categories" />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);
