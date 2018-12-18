import React from 'react';
import { Form, Button, Card, Grid, Icon } from 'semantic-ui-react';
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
  createCategory,
  saveNewCategory,
  fetchCategory,
  categoriesAreLoading

} from '../actions/actions.js'

const mapDispatchToProps = (dispatch) => ({
  handleCardFieldChange: (name, value, idx) => dispatch(handleCardFieldChange(name, value, idx)),
  handleCategoryFieldChange: (name, value) => dispatch(handleCategoryFieldChange(name, value)),
  updateCategory: (category) => dispatch(updateCategory(category)),
  addCard: () => dispatch(addCard()),
  deleteCard: (id) => dispatch(deleteCard(id)),
  deleteCategory: (id) => dispatch(deleteCategory(id)),
  selectCategoryById: (id) => dispatch(selectCategoryById(id)),
  createCategory: () => dispatch(createCategory()),
  saveNewCategory: (category) => dispatch(saveNewCategory(category)),
  fetchCategory: (id) => dispatch(fetchCategory(id)),
  categoriesAreLoading: () => dispatch(categoriesAreLoading())
})
const mapStateToProps = (state) => {
  return ({
    category: state.categories[state.selectedCategoryIndex],
    loading: state.loading,
    errors: state.errors
  })
}


class CategoryForm extends React.Component {
  componentDidMount = () => {
    const currentId = parseInt(this.props.match.params.id)
    if (this.props.match.path.match("edit") && this.props.category.id !== currentId) {
      this.props.categoriesAreLoading();
      setTimeout(() => {
        this.props.fetchCategory(currentId);
      }, 2000)
    }
  }
  renderCardForms = () => {
    return this.props.category.cards.map((c, idx) => {
      return (
        <Grid.Column key={idx}>
          <CardForm
            card={c}
            handleCardFieldChange={this.handleCardFieldChange}
            idx={idx}
            deleteCard={(id) => this.deleteCard(id)}
          />
        </Grid.Column>
      )
    })
  }
  render() {
    const { category } = this.props;
    return (
      <>
        {
          this.props.loading ?
            <Icon name="spinner" size="huge" />
            :
            <Grid divided="vertically" container stackable className="category-and-cards-container">
              <Grid.Row>
                <Button basic color="black" onClick={this.props.history.goBack}>Cancel</Button>
                <Button basic color="green" onClick={this.handleSubmit}>Save Changes</Button>
                { /* Only show delete button if the category has been saved to db */
                  category.id ?
                    <Button basic color="red" onClick={() => this.deleteCategory(category.id)}>Delete {category.name}</Button>
                    :
                    null
                }
              </Grid.Row>
              <Grid.Row>
                <Card fluid>
                  <Card.Content>
                    <Form
                      // controlId="formBasicText"
                      size="massive"
                    >
                      <Form.Field
                        control="input"
                        name="name"
                        value={category.name}
                        placeholder="Category Name"
                        onChange={this.handleCategoryFieldChange}>
                      </Form.Field>
                      <Form.TextArea
                        name="desc"
                        value={category.desc}
                        placeholder="Category Description"
                        onChange={this.handleCategoryFieldChange}>
                      </Form.TextArea>
                      <Form.Field
                        name="img_url"
                        value={category["img_url"]}
                        placeholder="Category Image URL"
                        onChange={this.handleCategoryFieldChange}
                        control="input"
                      >
                      </Form.Field>
                    </Form>
                  </Card.Content>
                </Card>
              </Grid.Row>
              <Grid.Row columns={2} stretched>
                <Grid.Column>
                  <Button fluid basic color='green' onClick={this.addCard}>
                    <h3>New Term</h3>
                    <br></br>
                    <Icon name="plus" circular size="big" />
                  </Button>
                </Grid.Column>
                {this.renderCardForms()}
              </Grid.Row>
            </Grid>
        }
      </>
    )
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
    (this.props.category.id ?
      this.props.updateCategory(this.props.category)
      :
      this.props.saveNewCategory(this.props.category)
    ).then(() => {
      this.goToCategories();
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
