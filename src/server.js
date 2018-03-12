import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from './reducers';
import { renderToString } from 'react-dom/server';
import App from './containers/App';

const app = Express();
const port = 1337;

// Server static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill thee out in the sections to follow
function handleRender(req, res) {
    // Create a new Redux store instance
    const store = createStore(counterApp);

    // Render the component to a string
    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const preloadedState = store.getState();

    res.set(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
    return `
        <!doctype html>
        <html>
            <head>
                <title>Redux Universal Example</title>
            </head>
            <body>
                <div id="root">${html}</div>
                <script>
                    // WARNING: See the following for security issues around embedding JSON in HTML:
                    // http://redux.js.org/recipes/ServerRendering.html#security-consideratons
                    window.__PRELOADED_STATE_ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                </script>
                <script src="/static/bundle.js"></script>
            </body>
        </html>
    `
}

app.listen(port);