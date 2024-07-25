// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Counter from './features/counter/Counter';
import PostList from './features/Post/PostList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Counter />
      <PostList />
    </Provider>
  );
};

export default App;
