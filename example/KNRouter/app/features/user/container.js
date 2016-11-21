'use strict';

import React, { Component } from 'react'
import { 
  View, 
  Text,
  TouchableOpacity
} from 'react-native'

class UserContainer extends Component {

  render () {
    return (
      <View style={{
              flex:1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
        <Text style={{fontSize:18}}>User Page</Text>
        <TouchableOpacity onPress={this.pressHandle.bind(this)}>
          <Text>Goto Search Page</Text>
        </TouchableOpacity>
      </View>
    )
  }

  pressHandle () {
    this.props.Router.push('search', 'title')
  }
}

export default UserContainer