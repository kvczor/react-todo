import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Paper,
    TextField,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    Checkbox
} from '@material-ui/core';
import {withStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';


import {SignOutButton} from '../components';
import {ENTER_KEY} from '../constants/keys';
import {toggleTodo, addTodo, fetchTodos} from "../store/actions";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(800 + theme.spacing.unit * 2 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    grow: {
        flexGrow: 1
    },
    newTodoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1
    },
    newTodoTextField: {
        display: 'flex',
        flexGrow: 1,
        paddingRight: 10
    },
    newTodoPriority: {
        display: 'flex',
        flexGrow: 1,
        paddingRight: 10
    },
    newTodoDueDate: {
        display: 'flex',
        flexGrow: 1,
        paddingRight: 10
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        }
    },
    todoItem: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    todoItemName: {
        flex: 1
    }
});

const priorityMap = {
    0: 'Normal',
    1: 'Urgent',
    2: 'Super urgent'
};

const priorities = Object.entries(priorityMap).map(priority => ({
    value: parseInt(priority[0]),
    label: priority[1]
}));

const newTodoInitState = {
    newTodoName: '',
    newTodoPriority: 0,
    newTodoDueDate: moment().format('YYYY-MM-DD')
};

class ToDoList extends Component {
    constructor() {
        super();

        this.state = {
            ...newTodoInitState
        };
    }

    componentDidMount() {
        this.props.fetchTodos();
    }

    handleTodoCheckboxClick = (id) => () => {
        this.props.toggleTodo(id);
    };

    handleNewTodoKeyDown = (event) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }
        event.preventDefault();
        const val = this.state.newTodoName.trim();

        if (val) {
            this.addNewTodo();
        }
    };

    addNewTodo = () => {
        this.setState({...newTodoInitState});
        this.props.addTodo({
            name: this.state.newTodoName,
            priority: this.state.newTodoPriority,
            dueDate: this.state.newTodoDueDate
        });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes, todos} = this.props;
        const sortedTodos = [...todos].sort((todoItem, nextTodoItem) => nextTodoItem.priority - todoItem.priority);

        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                Chama To-do
                            </Typography>
                            <SignOutButton/>
                        </Toolbar>
                    </AppBar>
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <div className={classes.newTodoContainer}>
                                <TextField
                                    id="new-todo"
                                    label="What needs to be done?"
                                    value={this.state.newTodoName}
                                    className={classes.newTodoTextField}
                                    onKeyDown={this.handleNewTodoKeyDown}
                                    onChange={this.handleChange('newTodoName')}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    id="todo-priority"
                                    select
                                    label="Priority"
                                    value={this.state.newTodoPriority}
                                    className={classes.newTodoPriority}
                                    onChange={this.handleChange('newTodoPriority')}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {priorities.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="todo-due-date"
                                    label="Due date"
                                    type="date"
                                    defaultValue={this.state.newTodoDueDate}
                                    className={classes.newTodoDueDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button onClick={this.addNewTodo} color="primary" variant="outlined" size="large">
                                    Add To-do
                                </Button>
                            </div>
                            <List>
                                {sortedTodos
                                    .map(todoItem => (
                                        <ListItem
                                            key={todoItem.id}
                                            dense
                                            className={classes.todoItem}
                                        >
                                            <Checkbox
                                                checked={todoItem.completed}
                                                tabIndex={-1}
                                                disableRipple
                                                onChange={this.handleTodoCheckboxClick(todoItem)}
                                            />
                                            <Typography
                                                className={classes.todoItemName}
                                                variant="subtitle1">{todoItem.name}</Typography>
                                            <ListItemText primary={`Priority: ${priorityMap[todoItem.priority]}`}/>
                                            <ListItemText primary={`Due: ${todoItem.dueDate}`}/>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </main>
                </MuiThemeProvider>
            </div>
        );

    }
}


const mapStateToProps = ({todos}) => ({
    todos
});

const mapDispatchToProps = dispatch => ({
    addTodo: todo => dispatch(addTodo(todo)),
    toggleTodo: id => dispatch(toggleTodo(id)),
    fetchTodos: id => dispatch(fetchTodos(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ToDoList))