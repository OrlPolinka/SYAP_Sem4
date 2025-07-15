import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Posts from './features/posts/Posts';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Posts />
      </div>
    </Provider>
  );
};

export default App;