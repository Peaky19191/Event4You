import { combineReducers } from 'redux';

import events from './events';
import auth from './auth';

export const reducers = combineReducers({ events, auth });
