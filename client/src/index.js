import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import axios from 'axios';
import {AuthContexProvider} from './Context/AuthContext';

axios.defaults.withCredentials = 'true';

ReactDOM.render(
  <React.StrictMode>
    <AuthContexProvider>
        <App />
    </AuthContexProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
