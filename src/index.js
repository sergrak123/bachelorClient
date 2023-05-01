import React from 'react';
import ReactDOM from 'react-dom/client';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import cartReducer from "./state";
import App from './App';
import './index.css';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
