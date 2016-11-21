'use strict';

import React, { Component } from 'react'
import { View, Text } from 'react-native'

class HomeContainer extends Component {

  render () {
    return (
      <View style={{
              flex:1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
        <Text style={{fontSize:18}}>Home Page</Text>
      </View>
    )
  }
}

export default HomeContainer