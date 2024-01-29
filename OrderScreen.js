import { StyleSheet, Text, View, FlatList, Alert, Image, TouchableNativeFeedback, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { assignToOrder } from './store/slices/OrderSlice';

const OrderScreen = () => {
  const { width, height } = Dimensions.get('window');
  const Order = useSelector((state) => state.Order.value)
  const Dispatch = useDispatch()
  const getOrder = async () => {
    try {
      const order = await AsyncStorage.getItem('Order')
      order ? Dispatch(assignToOrder(JSON.parse(order))) : null
    }
    catch (e) {
      Alert.alert('Storage Error')
    }
  }
  useEffect(() => {
    getOrder()

  }, [])
  const renderItem = ({ item, index }) => (
    <TouchableNativeFeedback>
      <View style={{ padding: 10, flexDirection: 'row', width: width - 35, left: 0, borderRadius: 15, backgroundColor: 'orange', alignItems: 'center' }}>
        <View style={{ flexDirection: 'column', left: '10%' }}>
          <Text style={{ fontSize: 12, fontWeight: '800', color: 'grey', padding: 5 }}>OrderNo : {item.OrderId}</Text>
          <Text style={{ fontSize: 18, fontWeight: '800', color: 'grey', padding: 5 }}>Date : {item.DateAndTime}</Text>
          <Text style={{ fontSize: 20, fontWeight: '800', color: 'grey', padding: 5 }}>Total Amount : {item.Price}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
  const ItemSeparator = () => <View style={styles.separator} />;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text style={{ fontSize: 30, padding: 5, fontWeight: '900', color: '#363737' }}>
        Order Details
      </Text>
      {Order.length !== 0 ?
        <FlatList
          data={Order}
          keyExtractor={(item) => item.OrderId}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
        /> :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, padding: 5, fontWeight: '900', opacity: 0.5 }}>
            No Orders Yet
          </Text>
        </View>
      }
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
  },
  separator: {
    height: 10,
  },
})