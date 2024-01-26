import { View, Text } from 'react-native'
import React from 'react'
import store from './store/storeIndex'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import Navigator from './Navigator'

export default function App() {
  return (
  <Provider store={store}>
    <Navigator/>
  </Provider>
  )
}