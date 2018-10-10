import _ from "lodash";

export const addTodo = ({name, priority, dueDate}) => {
    return ({
        type: 'ADD_TODO',
        id: _.uniqueId(),
        completed: false,
        name,
        priority,
        dueDate
    });
};

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
});