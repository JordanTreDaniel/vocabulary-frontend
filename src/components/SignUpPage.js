import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// const mapStateToProps = (state) => {
//     return { errors: state.categoriesAndTerms.errors };
// }
class SignUpPage extends React.Component {
    render = () => {
        return (
            <>
                <Grid>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <a href="https://github.com/login/oauth/authorize?client_id=d2a23424c8c70f95983c">
                                <Button basic color="green">Sign Up With Github</Button>
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        )
    }

}

export default connect(null, null)(SignUpPage);