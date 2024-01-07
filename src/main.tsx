import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import ErrorBoundary from './utils/errorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </Provider>
    </React.StrictMode>,
);
