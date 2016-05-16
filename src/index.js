import React from 'react';
import { render as renderToDom } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from './components/app';
import { rootReducer } from './reducers';

renderToDom(
    <Provider store={createStore(rootReducer)}>
        <App />
    </Provider>,
    document.querySelector('#app')
);