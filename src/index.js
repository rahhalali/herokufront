import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AmazonContextProvider } from "./Context/AmazonContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <AmazonContextProvider>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </AmazonContextProvider>,
  document.getElementById('root')
);
<script>

</script>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
