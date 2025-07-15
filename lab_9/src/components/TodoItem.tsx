import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/actions';
import { Todo } from '../redux/types';

interface Props {
    todo: Todo;
    onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onEdit }) => {
    const dispatch = useDispatch();

    return (
        <li className="todo-item">
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => dispatch(toggleTodo(todo.id))} 
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
            </span>
            <button className="todo-edit-button" onClick={() => onEdit(todo)}>✏️</button>
            <button className="todo-delete-button" onClick={() => dispatch(deleteTodo(todo.id))}>🗑️</button>
        </li>
    );
};