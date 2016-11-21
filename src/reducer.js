'use strict'

import { NavigationExperimental } from 'react-native'
import * as types from './constant'

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental

export const initialLoginNavigationState = {
  index: 0,
  routes: [{
    key: 'LoginPage',
    title: '登录'
  }]
}

export const initialRootNavigationState = {
  index: 0,
  routes: [{
    key: 'MainPage'
  }]
}

export const initialHomeNavigationState = {
  index: 0,
  routes: [{
    key: 'HomePage',
    title: '首页'
  }]
}

export const initialUserNavigationState = {
  index: 0,
  routes: [{
    key: 'UserPage',
    title: '我的'
  }]
}

const initialState = {
  navigationStates: {
    [types.NAVIGATOR_NAME_ROOT]:            initialRootNavigationState,
    [types.NAVIGATOR_NAME_LOGIN]:           initialLoginNavigationState,
    [types.NAVIGATOR_NAME_HOME]:            initialHomeNavigationState,
    [types.NAVIGATOR_NAME_USER]:            initialUserNavigationState
  },
  tabbarState: {
    selectedTab: 'HomeTab'
  }
}

export default function navigation (state = initialState, action) {
  switch (action.type) {
    case types.NAVIGATION_PUSH:
    case types.NAVIGATION_POP: {
      let originalNavigationState = state.navigationStates[action.navigator]
      let navigationState = null
      if (action.type === types.NAVIGATION_PUSH) {
        navigationState = NavigationStateUtils.push(originalNavigationState, action.route)
      } else if (action.type === types.NAVIGATION_POP) {
        navigationState = NavigationStateUtils.pop(originalNavigationState)
      }
      if (navigationState && navigationState !== originalNavigationState) {
        return Object.assign({}, state, {
          navigationStates: Object.assign({}, state.navigationStates, {[action.navigator]: navigationState})
        })
      }
      break
    }
    case types.NAVIGATION_LOGIN_RESET: {
      return Object.assign({}, state, {
        navigationStates: Object.assign({}, state.navigationStates, {[action.navigator]: initialLoginNavigationState})
      })
    }
    case types.TABBAR_SWITCH: {
      return Object.assign({}, state, {
        tabbarState: {
          selectedTab: action.tabProps.key
        }
      })
    }
    default:
      return state
  }
  return state
}