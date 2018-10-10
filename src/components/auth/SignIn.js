import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {auth} from '../../firebase/index';
import * as routes from '../../constants/routes';

import Paper from '@material-ui/core/Paper';

const initialState = {
    email: '',
    password: '',
    error: null,
    isLoading: false
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...initialState};
    }

    onSubmit = event => {
        const {email, password} = this.state;
        const {history} = this.props;
        this.setState({isLoading: true});

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...initialState});
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    };

    render() {
        const {email, password, error, isLoading} = this.state;
        const isInvalid = password === '' || email === '';
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
                <button disabled={isInvalid || isLoading} type="submit">
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

export default withRouter(SignInPage);