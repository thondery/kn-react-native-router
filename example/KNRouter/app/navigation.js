'use strict'

import { combineReducers } from 'redux'
import { reducer } from 'kn-react-native-router'
import { navigationState } from './router'

const initialState = {
  navigationStates: navigationState,
  tabbarState: {
    selectedTab: 'HomeTab'
  }
}

export default (state = initialState, action) => reducer(state, action)