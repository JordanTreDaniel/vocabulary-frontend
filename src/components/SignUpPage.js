import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import queryString from 'query-string';
// const mapStateToProps = (state) => {
//     return { errors: state.categoriesAndTerms.errors };
// }
class SignUpPage extends React.Component {

    componentWillMount = () => {
        const code = queryString.parse(this.props.location.search).code;
        // this.signInUser(code);
    }
    render = () => {
        return (
            <>
                <Grid>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}>
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