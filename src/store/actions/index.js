let nextTodoId = 0;
export const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    name
});

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
});