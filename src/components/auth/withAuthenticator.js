import React from 'react';

import {firebase} from '../../firebase';

const withAuthenticator = (Component) =>
    class withAuthenticator extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
            };
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState({authUser})
                    : this.setState({authUser: null});
            });
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    };

export default withAuthenticator;