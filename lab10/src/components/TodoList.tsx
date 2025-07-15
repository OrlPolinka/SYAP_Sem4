import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addTodo, editTodo } from '../redux/TodosSlice';
import { TodoItem } from './TodoItem';
import { Todo } from '../redux/types';

export const TodoList: React.FC = () => {
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todos);

    const handleAddOrEdit = () => {
        if (!input.trim()) return;

        if (editId !== null) {
            dispatch(editTodo({ id: editId, text: input }));
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
                    onKeyPress={e => e.key === 'Enter' && handleAddOrEdit()}
                />
                <button 
                    className="todo-button" 
                    onClick={handleAddOrEdit}
                    disabled={!input.trim()}
                >
                    {editId !== null ? 'Изменить' : 'Добавить'}
                </button>
            </div>
            {todos.length > 0 ? (
                <ul className="todo-list">
                    {todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
                    ))}
                </ul>
            ) : (
                <p className="todo-empty">Список дел пуст</p>
            )}
        </div>
    );
};