'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet, 
  View, 
  Text, 
  Image
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
//import Icon from 'react-native-vector-icons/FontAwesome'


import Navigator from './navigator'
import { 
  navigationPop,
  navigationPush,
  navigationLoginDefault
} from './action'

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: '#f60',
    height: 100
  },
  textStyle: {
    color: '#666',
    fontSize: 12,
    marginBottom: 6
  },
  selectedTextStyle: {
    color: '#f60'
  }
})

export default class MainPage extends Component {

  render () {
    let { selectedTab, onTabPress, tabRoutes } = this.props
    return (
      <TabNavigator style={styles.tabs}>
      {
        tabRoutes.map( (item, i) => {
          let Icon = item.Icon
          let SelectIcon = item.selectIcon
          let NavigatorContainer = item.component
          return (
            <TabNavigator.Item key={i}
              title={item.title}
              style={styles.tab}
              selected={selectedTab === item.tabName}
              selectedTitleStyle={styles.selectedTextStyle}
              titleStyle={styles.textStyle}
              renderIcon={() => <Icon />}
              renderSelectedIcon={() => <SelectIcon />}
              onPress={() => onTabPress({key: item.tabName})}
              >
              <NavigatorContainer />
            </TabNavigator.Item>
          )
        })
      }
      </TabNavigator>
    )
  }
}


function getPageName (name) {
  return name.replace(/(\w)/, e => e.toUpperCase()) + 'Page'
}

function getConstantType (name) {
  return `NAVIGATOR_NAME_${name.toUpperCase()}`
}