import { StyleSheet, Text, View,Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import ProductScreen from './ProductScreen'
import CartScreen from './CartScreen'
import OrderScreen from './OrderScreen'

const Navigator = () => {
    const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{animationEnabled: true,
          // tabBarShowLabel:false,
          headerShown:false,
          tabBarActiveTintColor:'black',
          tabBarInactiveTintColor:'grey',}}>
            <Tab.Screen name='Product' component={ProductScreen} options={{
              tabBarIcon:({focused})=>(
                focused? <Image style={{width:'15%',height:'60%'}} source={require('./assets/product.png')}/>:
           <Image style={{width:'15%',height:'60%',opacity:0.4}} source={require('./assets/product.png')}/>
              )
            }}/>
            <Tab.Screen name='Cart' component={CartScreen} options={{
              tabBarIcon:({focused})=>(                
                focused? <Image style={{width:'15%',height:'60%'}} source={require('./assets/cart.png')}/>:
           <Image style={{width:'15%',height:'60%',opacity:0.4}} source={require('./assets/cart.png')}/>
              )
            }}/>
            <Tab.Screen name='Order' component={OrderScreen} options={{
              tabBarIcon:({focused})=>(
                focused? <Image style={{width:'15%',height:'60%'}} source={require('./assets/order.png')}/>:
           <Image style={{width:'15%',height:'60%',opacity:0.4}} source={require('./assets/order.png')}/>
              )
            }}/>
            
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})