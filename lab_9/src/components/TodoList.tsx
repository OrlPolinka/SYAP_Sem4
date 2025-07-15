import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo } from '../redux/actions';
import { TodoItem } from './TodoItem';
import { Todo } from '../redux/types';


export const TodoList: React.FC = () => {
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const dispatch = useDispatch();
    const todos = useSelector((state: Todo[]) => state);

    const handleAddOrEdit = () => {
        if (!input.trim()) return;

        if (editId !== null) {
            dispatch(editTodo(editId, input));
            setEditId(null);
        } else {
            dispatch(addTodo(input));
        }
        setInput('');
    };

    const handleEdit = (todo: Todo) => {
        setEditId(todo.id);
        setInput(todo.text);
    };

    return (
        <div className="todo-container">
            <h1 className="todo-title">Список дел</h1>
            <div className="todo-input-container">
                <input
                    className="todo-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Новая задача"
                />
                <button 
                    className="todo-button" 
                    onClick={handleAddOrEdit}
                >
                    {editId !== null ? 'Изменить' : 'Добавить'}
                </button>
            </div>
            <ul className="todo-list">
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
                ))}
            </ul>
        </div>
    );
};