import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import queryString from 'query-string';
import { signInUser } from '../actions/actions'
// const mapStateToProps = (state) => {
//     return { errors: state.categoriesAndTerms.errors };
// }
const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: (gitHubCode) => signInUser(gitHubCode)
    }
}
class SignUpPage extends React.Component {

    componentWillMount = () => {
        const code = queryString.parse(this.props.location.search).code;
        if (code !== undefined) {
            debugger;
            this.props.signInUser(code);
        }
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

export default connect(null, mapDispatchToProps)(SignUpPage);