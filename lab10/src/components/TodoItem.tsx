import React from 'react';
import { useAppDispatch } from '../hooks';
import { toggleTodo, deleteTodo } from '../redux/TodosSlice';
import { Todo } from '../redux/types';

interface Props {
    todo: Todo;
    onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onEdit }) => {
    const dispatch = useAppDispatch();

    return (
        <li className="todo-item">
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => dispatch(toggleTodo(todo.id))} 
                className="todo-checkbox"
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
            </span>
            <div className="todo-actions">
                <button 
                    className="todo-edit-button" 
                    onClick={() => onEdit(todo)}
                    aria-label="Редактировать"
                >
                    ✏️
                </button>
                <button 
                    className="todo-delete-button" 
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    aria-label="Удалить"
                >
                    🗑️
                </button>
            </div>
        </li>
    );
};