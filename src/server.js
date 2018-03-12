import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from './reducers';
import App from './containers/App';

const app = Express();
const port = 1337;

// Server static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill thee out in the sections to follow
function handleRender(req, res) {

}

function renderFullPage(html, preloadedState) {

}

app.listen(port);