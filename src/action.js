'use strict'

import * as types from './constant'

export function navigationPush (route, navigator = '') {
  return {
    type: types.NAVIGATION_PUSH,
    route,
    navigator
  }
}

export function navigationPop (navigator = '') {
  return {
    type: types.NAVIGATION_POP,
    navigator
  }
}

export function tabbarSwitch (tabProps) {
  return {
    type: types.TABBAR_SWITCH,
    tabProps
  }
}

export function navigationLoginReset () {
  return {
    type: types.NAVIGATION_LOGIN_RESET,
    navigator: types.NAVIGATOR_NAME_LOGIN
  }
}

export function navigationLoginDefault () {
  return {
    type: types.NAVIGATION_PUSH,
    route: {
        key: 'LoginNavigator'
    },
    navigator: types.NAVIGATOR_NAME_ROOT
  }
}