import React from 'react';
import {firebase} from '../../firebase';

import Button from '@material-ui/core/Button';

const signOut = () => firebase.auth.signOut();

export const SignOutButton = () => <Button onClick={signOut} color="inherit">Sign out</Button>;