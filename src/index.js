import React from 'react';
import { render as renderToDom } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { App } from './components/app';
import { rootReducer } from './reducer';

const createStoreWithMiddleware = applyMiddleware()(createStore);

renderToDom(
    <Provider store={createStore(rootReducer)}>
        <App />
    </Provider>,
    document.querySelector('#app')
);