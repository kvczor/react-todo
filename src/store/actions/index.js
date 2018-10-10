import {todosRef} from "../../firebase/firebase";
import {FETCH_TODOS} from "../../constants/actions";

export const toggleTodo = todo => dispatch => {
    todosRef.child(todo.id).set({...todo, completed: !todo.completed});
};

export const addTodo = ({name, priority, dueDate}) => async dispatch => {
    const newTodo = {
        completed: false,
        name,
        priority,
        dueDate
    };

    todosRef.push(newTodo)
        .then(snapshot => {
            todosRef.child(snapshot.key);
        });
};

export const completeToDo = completeToDoId => async dispatch => {
    todosRef.child(completeToDoId).remove();
};


export const fetchTodos = () => async dispatch => {
    todosRef.on("value", snapshot => {
        dispatch({
            type: FETCH_TODOS,
            payload: snapshot.val()
        });
    });
};