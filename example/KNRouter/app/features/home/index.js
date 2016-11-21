'use strict';

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  navigator as Navigator,
  actions
} from 'kn-react-native-router'
import * as types from '../../router'
import HomeContainer from './container'

const { 
  navigationPop,
  navigationPush,
  navigationLoginDefault
} = actions

class HomeNavigator extends Navigator {

    constructor(props) {
      super(props)
      this.name = 'home'
      this.container = HomeContainer
    }

}

function mapStateToProps(state) {
  return {
    navigationState: state.navigation.navigationStates[types.NAVIGATOR_NAME_HOME]
  }
}

export default connect(mapStateToProps, {
      navigationPop,
      navigationPush,
      navigationLoginDefault
    }
  )(HomeNavigator)