'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import { 
  navigationPop,
  navigationPush,
  navigationLoginDefault
} from './action'

const styles = StyleSheet.create({
  tabs: {
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
                               onPress={() => onTabPress({key: item.tabName})} >
              <NavigatorContainer />
            </TabNavigator.Item>
          )
        })
      }
      </TabNavigator>
    )
  }
  
}