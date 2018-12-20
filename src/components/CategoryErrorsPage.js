import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return { errors: state.categoriesAndTerms.errors };
}
const CategoryErrorsPage = ({ errors, history }) => {
    let response;
    switch (errors.length) {
        case 0:
            history.push('/');
            break;
        case 1:
            response = `There is an error.`
            break;
        default:
            response = `There are ${errors.length} errors.`
    }
    return (
        <>
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <h1>Oops, something went wrong.</h1>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>{response}</h3>
                    </Grid.Column>
                    <Grid.Column>
                        <h4>See javascript console for techy details.</h4>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default connect(mapStateToProps, null)(CategoryErrorsPage);