import { Platform, StatusBar, Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import Constants from 'expo-constants'
import NetInfo from '@react-native-community/netinfo'

export default class Status extends React.Component {
  state = {
    info: null,
    type: null,
  }

  render() {
    const unsubscribe = NetInfo.addEventListener(net => {
      this.state.info = net.type
      console.log('Connection type', net.type);
      console.log('Is connected?', net.isConnected);
    });

    unsubscribe()
    const {info} = this.state

    const isConnected = info !== 'none'
    const backgroundColor = isConnected ? 'white' : 'red'
    const statusBar = (
      <StatusBar 
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}/>
    )

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents={'none'}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No Network Connection</Text>
          </View>
        )}
      </View>
    )

    if (Platform.OS == 'ios'){
        return(
            <View style={[styles.status, {backgroundColor}]}>{messageContainer}</View>
        )
    }
    return messageContainer
  }
}

const statusHeight = Platform.OS == "ios" ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight+20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});