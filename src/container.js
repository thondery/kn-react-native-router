'use strict'

import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-root-toast'

import * as types from './constant'
import {
  navigationPush,
  tabbarSwitch,
  navigationLoginDefault
} from './action'
import MainPage from './mainpage'

class MainContainer extends Component {

  constructor(props) {
    super(props)
    this.handleBack = this._handleBack.bind(this, props.tabRoutes)
    this.pendingExitTab = ''
    this.pendingExit = 0   // 等待退出应用标记
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    this.props.navigationLoginReset()
  }

  _handleBack (tabRoutes) {
    // 判断当前处在哪个tab的导航内
    let navigatorName
    tabRoutes.forEach((_tab) => {
      let tabName = getTabName(_tab.name)
      let constantType = getConstantType(_tab.name)
      if (tabName === this.props.selectedTab) {
        navigatorName = constantType
      }
    })
    if (!navigatorName) {
      return true
    }

    let navigationState = this.props.navigationStates[navigatorName]
    if (navigationState.index > 0) {
      // 不在首页, 则执行当前导航的POP
      this.props.navigationPop(types.NAVIGATOR_NAME_HOME)
      return true
    }

    let currentTime = new Date().getTime()
    if (this.props.selectedTab !== this.pendingExitTab || currentTime - this.pendingExit > 1500) {
      Toast.show('再按一次退出应用', {
        duration: Toast.durations.SHORT, // toast显示时长
        position: Toast.positions.BOTTOM, // toast位置
        shadow: false, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0 // toast显示的延时
      })
      this.pendingExitTab = this.props.selectedTab
      this.pendingExit = currentTime
      return true
    }
    return false
  }

  handleTabPress(tabProps) {
    switch (tabProps.key) {
      case 'UserTab':
        let hasLogin = true

        // 如果未登录, 直接切换tab, 否则弹出登录页
        if (hasLogin) {
            this.props.tabbarSwitch(tabProps)
        } else {
            this.props.navigationLoginDefault()
        }
        break
      default:
        this.props.tabbarSwitch(tabProps)
    }
  }

  render() {
    return (
      <MainPage selectedTab={this.props.selectedTab}
                tabRoutes={this.props.tabRoutes}
                onTabPress={this.handleTabPress.bind(this)} />
    )
  }

}

function getTabName (name) {
  return name.replace(/(\w)/, e => e.toUpperCase()) + 'Tab'
}

function getConstantType (name) {
  return `NAVIGATOR_NAME_${name.toUpperCase()}`
}

function mapStateToProps(state) {
  return {
    navigationStates: state.navigation.navigationStates,
    selectedTab: state.navigation.tabbarState.selectedTab
  }
}

export default connect(
  mapStateToProps, {
    navigationPush,
    tabbarSwitch,
    navigationLoginDefault
  }
)(MainContainer)