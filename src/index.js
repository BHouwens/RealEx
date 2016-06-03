import React from 'react';
import { render as renderToDom } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from './components/app';
import { hotCursor } from './utils/hotCursor';
import { config } from './utils/config';
import { rootReducer } from './reducers';

hotCursor.initialise(config, 'RealEx');

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