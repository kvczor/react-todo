import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import { auth } from '../../firebase/index';
import * as routes from '../../constants/routes';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                history.push(routes.HOME);
            })
            .catch(error => {

            });

        event.preventDefault();
    };

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInPage = ({history}) =>
    <div>
        <Paper>
        <h1>SignIn</h1>
        <SignInForm history={history}/>
        </Paper>
    </div>;

export default withRouter(withStyles(styles)(SignInPage));