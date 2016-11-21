'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  NavigationExperimental, 
  View,
  Text,
  StyleSheet
} from 'react-native'

import * as types from './constant'

const {
  Header: NavigationHeader,
  CardStack: NavigationCardStack
} = NavigationExperimental

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})







export default class Navigator extends Component {

  constructor (props) {
    super(props)
    //this.handleBack = this._handleBack.bind(this)
    this.name = ''
    this.container = null
    //this.showHeader = true
  }



  renderScene(sceneProps) {
    let route = sceneProps.scene.route
    let pageName = getPageName(this.name)
    let Container = this.container
    let Router = {
      push: this.routerPush.bind(this),
      pop: this.routerPop.bind(this)
    }
    switch (route.key) {
      case pageName:
        return (
          <Container Router={Router}
                     
                      />
        )
      default:
        return null
    }
  }

  routerPush (page, title, root = types.NAVIGATOR_NAME_ROOT) {
    let opts = {
      key: getNavigatorName(page),
      title: title
    }
    this.props.navigationPush(opts, root)
  }

  routerPop () {
    this.props.navigationPop(types.NAVIGATOR_NAME_ROOT)
  }

  render() {
    return (
      <NavigationCardStack style={styles.navigator}
                           direction='horizontal'
                           navigationState={this.props.navigationState}
                           renderScene={this.renderScene.bind(this)}
                           //renderHeader={this.renderHeader.bind(this)} 
                           />
    )
  }
}


function getPageName (name) {
  return name.replace(/(\w)/, e => e.toUpperCase()) + 'Page'
}

function getConstantType (name) {
  return `NAVIGATOR_NAME_${name.toUpperCase()}`
}

function getNavigatorName (name) {
  return name.replace(/(\w)/, e => e.toUpperCase()) + 'Navigator'
}

