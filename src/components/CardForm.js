import React, { Fragment } from 'react';
import { Form, Button, Card } from 'semantic-ui-react';

const CardForm = (props) => {
    const { card } = props;
    return (
        <Card>
            <Card.Content>
                <Form>
                    <h3>{card.term}</h3>
                    <Form.Field>
                        <input
                            type="text"
                            placeholder="Term"
                            name="term"
                            value={card.term}
                            onChange={(e) => {
                                props.handleCardFieldChange(e, props.idx)
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            type="text"
                            placeholder="Definition"
                            name="def"
                            value={card.def}
                            onChange={(e) => {
                                props.handleCardFieldChange(e, props.idx)
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            type="text"
                            placeholder="Description"
                            name="desc"
                            value={card.desc}
                            onChange={(e) => {
                                props.handleCardFieldChange(e, props.idx)
                            }}
                        />
                    </Form.Field>
                </Form>
            </Card.Content>
            {card.id ?
                <Card.Content>
                    <Button basic color="red" onClick={() => props.deleteCard(card.id)}>Delete Card</Button>
                </Card.Content>
                :
                null
            }
        </Card>
    )
}

export default CardForm;