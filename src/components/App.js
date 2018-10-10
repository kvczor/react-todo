import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import SignIn from './auth/SignIn';
import Todos from './Todos';
import {firebase} from '../firebase';

import * as routes from '../constants/routes';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
    debugger;
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: routes.SIGN_IN,
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    );
};


export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: true
        };
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(user => {
                if (user) {
                    this.setState({
                        isAuthenticated: true,
                        userInfo: user
                    });
                    return;
                }

                this.setState({
                    isAuthenticated: false,
                    userInfo: null
                });
            }
        )
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route
                            path={routes.SIGN_IN}
                            component={SignIn}
                        />
                        />
                        <PrivateRoute
                            isAuthenticated={this.state.isAuthenticated}
                            component={Todos}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}