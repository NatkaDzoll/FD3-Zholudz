"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import CosmeticsList from './components/CosmeticsList';

import store from './store.json'

ReactDOM.render(
    <CosmeticsList  items = {store} 
                    startWorkMode = {0}
    />
    , document.getElementById("app")
);