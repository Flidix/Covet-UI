import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthStore from './store/AuthStore';
import { createContext } from 'react';

interface State {
  auth: AuthStore;
}

export const auth = new AuthStore();

export const Context = createContext<State>({
  auth
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Context.Provider value={{
      auth
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
