import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import SignIn from './auth/SignIn';
import Home from './Home';
import {firebase} from '../firebase';

import * as routes from '../constants/routes';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
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
            isAuthenticated: true,
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        firebase.auth.onAuthStateChanged(user => {
            user
                ? this.setState({
                    isAuthenticated: true,
                    isLoading: false,
                })
                : this.setState({
                    isAuthenticated: false,
                    isLoading: false
                });
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route
                            path={routes.SIGN_IN}
                            component={SignIn}/>
                        />
                        <Route
                            path={routes.SIGN_OUT}
                            component={SignIn}/>
                        />
                        <PrivateRoute
                            isAuthenticated={this.state.isAuthenticated}
                            component={Home}/>

                    </Switch>
                </div>
            </Router>
        );
    }
}