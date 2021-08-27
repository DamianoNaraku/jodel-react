import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {Log, U, GraphPoint, Size, myFileReader, ISize, Uarr, RawVertex, RawEdge, RawGraph, GraphSize, Point, IPoint, TagNames, ParseNumberOrBooleanOptions, CSSParser, $s} from "./common/U";
import {store} from "./redux/createStore";

ReactDOM.render(
  // <React.StrictMode> <App /> </React.StrictMode>,
    // eslint-disable-next-line react/jsx-no-undef
    <Provider store={store}><App/></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

