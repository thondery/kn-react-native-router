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

export default class MainNavigator extends Component {

  constructor (props) {
    super(props)
    this.handleBack = this._handleBack.bind(this)
    this.name = ''
    this.container = null
    this.showHeader = true
    this.Router = {
      push: this.routerPush.bind(this),
      pop: this.routerPop.bind(this)
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    this.props.navigationLoginReset()
  }

  _handleBack () {
    let navigationState = this.props.navigationState
    if (navigationState.index > 0) {
      // 不在首页, 则执行当前导航的POP
      this.props.navigationPop(getConstantType(this.name))
    } else {
      // 在首页, 执行上级导航的POP, 退出当前导航
      this.props.navigationPop(types.NAVIGATOR_NAME_ROOT)
    }
    return true
  }

  onNavigateBack(sceneProps) {
    let route = sceneProps.scene.route
    switch (route.key) {
      case getPageName(this.name):
        // 调用上级导航的POP
        console.log(types.NAVIGATOR_NAME_ROOT)
        this.props.navigationPop(types.NAVIGATOR_NAME_ROOT)
        break
      default:
        this.props.navigationPop(getConstantType(this.name))
    }
  }

  renderTitleComponent(sceneProps) {
    const route = sceneProps.scene.route
    const { title, root } = route
    let headerTitle = root ? title : this.props.title || title
    return (
      <NavigationHeaderTitle textStyle={{
                               textAlign: 'center', 
                               fontWeight: Platform.OS === 'ios' ? '500' : '100'
                             }}>{headerTitle}</NavigationHeaderTitle>
    )
  }

  renderLeftComponent(sceneProps) {
    return (
      <NavigationHeaderBackButton
        {...sceneProps}
        onPress={() => this.onNavigateBack(sceneProps)}
      />
    )
  }

  renderRightComponent(sceneProps) {
    return null
  }

  renderHeader(sceneProps) {
    let route = sceneProps.scene.route
    if (!this.showHeader) return
    switch (route.key) {
      default:
        return (
          <NavigationHeader {...sceneProps}
                            onNavigateBack={() => this.onNavigateBack(sceneProps)}
                            renderTitleComponent={this.renderTitleComponent.bind(this)}
                            renderLeftComponent={this.renderLeftComponent.bind(this)}
                            renderRightComponent={this.renderRightComponent.bind(this)} />
        )
    }
  }

  renderScene(sceneProps) {
    let route = sceneProps.scene.route
    let pageName = getPageName(this.name)
    let Container = this.container
    if (this.container[route.key]) {
      let _route = this.container[route.key] || {}
      pageName = _route.routeKey
      Container = _route.component
    }
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
                           renderHeader={this.renderHeader.bind(this)} />
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