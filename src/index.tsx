import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter basename={process.env.HUB_BASE_NAME}>
        <App />
    </BrowserRouter>,
    document.querySelector('#app'),
);
