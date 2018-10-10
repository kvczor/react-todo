import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import {auth} from '../../firebase/index';
import * as routes from '../../constants/routes';

const initialState = {
    email: '',
    password: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {...initialState};
    }

    onSubmit = event => {
        const {email, password} = this.state;
        const {history} = this.props;

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
        const {classes} = this.props;

        return (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={this.onSubmit} className={classes.form}>
                        {error && <p>{error.message}</p>}
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={event => this.setState(byPropKey('email', event.target.value))}
                                type="text"
                                placeholder="Email Address"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={event => this.setState(byPropKey('password', event.target.value))}
                                placeholder="Password"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isInvalid || isLoading}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

export default withRouter(withStyles(styles)(SignIn));