import React from 'react';
import ReactDOM from 'react-dom';
import HashRouter from 'react-router-dom/es/HashRouter';

import 'bootstrap/dist/css/bootstrap.css';
import App from './App';


ReactDOM.render(
    <HashRouter >
        <App />
    </HashRouter>,
    document.getElementById('root'),
);
