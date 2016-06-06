import React from 'react';
import { render as renderToDom } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from './components';
import { rootReducer } from './reducers';

function configureStore() {
    const store = createStore(rootReducer, 
      window.devToolsExtension ? window.devToolsExtension() : undefined
    );
    return store;
}

renderToDom(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.querySelector('#app')
);