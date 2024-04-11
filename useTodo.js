import { useEffect, useReducer } from "react";
import { todoReducer } from "../09-useReduce/todoReducer";


const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
}


export const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const hDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }
    
    const hToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }


    const hShowNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };
        dispatch(action)
    };

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,

        hShowNewTodo,
        hDeleteTodo, 
        hToggleTodo
    }
}
