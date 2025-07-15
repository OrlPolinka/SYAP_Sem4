import React from 'react';
import { TodoList } from './components/TodoList';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <TodoList />
            </div>
        </Provider>
    );
};

export default App;