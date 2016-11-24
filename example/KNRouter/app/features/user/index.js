'use strict';

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  MainNavigator,
  actions
} from 'kn-react-native-router'
import * as types from '../../router'
import UserContainer from './container'

const { 
  navigationPop,
  navigationPush
} = actions

class UserNavigator extends MainNavigator {

    constructor(props) {
      super(props)
      this.name = 'user'
      this.container = UserContainer
    }


  

}

function mapStateToProps(state) {
  return {
    navigationState: state.navigation.navigationStates[types.NAVIGATOR_NAME_USER]
  }
}

export default connect(mapStateToProps, {
      navigationPop,
      navigationPush
    }
  )(UserNavigator)