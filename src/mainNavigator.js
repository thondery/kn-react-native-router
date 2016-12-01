'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  NavigationExperimental, 
  View,
  Text,
  StyleSheet, 
  BackAndroid,
  Platform
} from 'react-native'
import * as types from './constant'

const {
  Header: NavigationHeader,
  CardStack: NavigationCardStack
} = NavigationExperimental

const {
  BackButton: NavigationHeaderBackButton,
  Title: NavigationHeaderTitle
} = NavigationHeader

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

export default class RootNavigator extends Component {

  constructor (props) {
    super(props)
    this.name = ''
    this.container = null
    this.showHeader = true
    this.Router = {
      push: this.routerPush.bind(this),
      pop: this.routerPop.bind(this)
    }
  }

  renderTitleComponent(sceneProps) {
    const title = sceneProps.scene.route.title || ''
    return (
      <NavigationHeaderTitle textStyle={{
                               textAlign: 'center', 
                               fontWeight: Platform.OS === 'ios' ? '500' : '100'
                             }}>{title}</NavigationHeaderTitle>
    )
  }

  renderHeader(sceneProps) {
    let route = sceneProps.scene.route
    if (!this.showHeader) return
    switch (route.key) {
      default:
        return (
          <NavigationHeader
            {...sceneProps}
            onNavigateBack={() => this.props.navigationPop()}
            renderTitleComponent={this.renderTitleComponent.bind(this)} />
        )
    }
  }

  renderScene(sceneProps) {
    let route = sceneProps.scene.route
    let pageName = getPageName(this.name)
    let Container = this.container
    switch (route.key) {
      case pageName:
        return (
          <Container Router={this.Router} />
        )
      default:
        return null
    }
  }

  routerPush (page, title, root = 'root') {
    let opts = {
      key: /Page$/i.test(page) ? page : getNavigatorName(page),
      title: title,
      opts: {
        title: title
      },
      root: root
    }
    let ROOT = getConstantType(root)
    this.props.navigationPush(opts, ROOT)
  }

  routerPop () {
    this.props.navigationPop(types.NAVIGATOR_NAME_ROOT)
  }

  render() {
    return (
      <NavigationCardStack style={styles.navigator}
                           navigationState={this.props.navigationState}
                           renderScene={this.renderScene.bind(this)}
                           renderHeader={this.renderHeader.bind(this)} 
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