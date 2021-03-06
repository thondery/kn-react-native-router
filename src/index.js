'use strict';

import React, { Component, Children } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  NavigationExperimental
} from 'react-native'
import * as types from './constant'
import MainContainer from './container'
import navigation from './reducer'
import MainNavigator from './mainNavigator'
import PageNavigator from './pageNavigator'
import * as actions from './action'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils
} = NavigationExperimental

class Route extends Component {
  className() {
    return 'Route'
  }

  render() {
    return null
  }
}

class TabRoute extends Component {
  className() {
    return 'TabRoute'
  }

  render() {
    return null
  }
}

class RootNavigator extends Component {

  constructor(props) {
    super(props)
    let { children } = props
    //
    let routes = {}
    let tabRoutes = []
    Children.forEach(children, (child, index) => {
      let name = child.props.name
      if (child.type.prototype.className() == 'TabRoute') {
        Children.forEach(child.props.children, (tabChild, tabIndex) => {
          let tabname = tabChild.props.name
          tabRoutes.push({
            name: tabname,
            tabName: getTabName(tabname),
            title: tabChild.props.title,
            Icon: tabChild.props.icon,
            selectIcon: tabChild.props.selectIcon,
            component: tabChild.props.component
          })
        })
      }
      else if (child.type.prototype.className() == 'Route') {
        let { component } = child.props
        let routeKey = getNavigatorName(name)
        routes[routeKey] = {
          name: name,
          routeKey: routeKey,
          component: component
        }
      }
    })
    this.routes = routes
    this.tabRoutes = tabRoutes
  }

  render () {
    let { style, navigationState } = this.props
    return (
      <NavigationCardStack style={[styles.container, style]}
                           direction={'horizontal'}
                           navigationState={navigationState}
                           renderScene={this.renderScene.bind(this)} />
    )
  }

  renderScene (sceneProps) {
    let route = sceneProps.scene.route
    let _route = this.routes[route.key] || {}
    let routeKey = _route.routeKey 
    switch (route.key) {
      case 'MainPage':
        return <MainContainer tabRoutes={this.tabRoutes} />
      case routeKey:
        let Container = _route.component
        return <Container {...route} />
      default:
        return null
    }
  }

}

function getNavigatorName (name) {
  return name.replace(/(\w)/, e => e.toUpperCase()) + 'Navigator'
}

function getTabName (name) {
  return name.replace(/(\w)/, e => e.toUpperCase()) + 'Tab'
}

function mapStateToProps (state) {
  return {
    navigationState: state.navigation.navigationStates[types.NAVIGATOR_NAME_ROOT]
  }
}

const Router = connect(
    mapStateToProps, {}
  )(RootNavigator)

export {
  Router,
  Route,
  TabRoute,
  navigation,
  PageNavigator,
  MainNavigator,
  types,
  actions
}