import React, { Fragment } from 'react';
import { Form, Button, Card } from 'semantic-ui-react';

const CardForm = (props) => {
    const { card } = props;
    return (
        <Card className="card-form" fluid>
            <Card.Content>
                <Form size="big">
                    <Form.Field
                        type="text"
                        placeholder="Term"
                        name="term"
                        value={card.term}
                        onChange={(e) => {
                            props.handleCardFieldChange(e, props.idx)
                        }}
                        control="input"
                    >
                    </Form.Field>
                    <Form.TextArea
                        type="text"
                        placeholder="Definition"
                        name="def"
                        value={card.def}
                        onChange={(e) => {
                            props.handleCardFieldChange(e, props.idx)
                        }}
                    >
                    </Form.TextArea>
                    <Form.TextArea
                        type="text"
                        placeholder="Description"
                        name="desc"
                        value={card.desc}
                        onChange={(e) => {
                            props.handleCardFieldChange(e, props.idx)
                        }}
                    >
                    </Form.TextArea>
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