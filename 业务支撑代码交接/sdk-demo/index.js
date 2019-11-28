/**
 * Created by karl.zheng on 2018/1/8.
 */
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Router, hashHistory } from 'react-router'
import routeConfig from './router'
import { store, resize } from './config/requires'

import 'reset.css'

require('./base.css')

render((
    <Provider store={store} >
        <Router routes={routeConfig} history={hashHistory} />
    </Provider>
), document.getElementById('sdk'));

