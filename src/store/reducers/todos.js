import {FETCH_TODOS} from "../../constants/actions";

const todos = (state = [], action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return Object.entries(action.payload || [])
                .map(item => {
                    return {
                        id: item[0],
                        ...item[1]
                    };
                });
        default:
            return state
    }
};

export default todos;