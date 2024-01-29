import { FlatList, Image, StyleSheet, Text, TouchableNativeFeedback, View, Dimensions, TouchableOpacity, Alert, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToOrder } from './store/slices/OrderSlice';
import { emptyCart, removeFromCart } from './store/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const { width, height } = Dimensions.get('window');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [totalprice, setTotalprice] = useState(null)
  const Cart = useSelector((state) => state.Cart.value)
  const Order = useSelector((state) => state.Order.value)
  const PriceAnimaton = useRef(new Animated.Value(0)).current
  const PriceInterpolate = PriceAnimaton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height]
  })
  const handleScroll = (event) => {
    const currentScrollPos = event.nativeEvent.contentOffset.y;


    if (currentScrollPos > prevScrollPos) {
      Animated.timing(PriceAnimaton, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start()

    }

    else {
      Animated.timing(PriceAnimaton, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start()
    }

    // Update the previous scroll position
    setPrevScrollPos(currentScrollPos);
  };
  const Dispatch = useDispatch()
  useEffect(() => {
    let price = 0
    Cart.map((item) => {
      price += item.price
    })
    setTotalprice(price)
  }, [Cart])
  const renderItem = ({ item, index }) => (

    <TouchableNativeFeedback
      // style={{width:'100%'}}
      onPress={() => {
        // addCart(item);
      }}
    >
      <View style={{ padding: 10, flexDirection: 'row', width: width - 10, borderRadius: 15, backgroundColor: 'orange' }}>
        <Image source={{ uri: item.thumbnail }} style={{ height: '80%', width: '20%', padding: 5, top: 6 }} />

        <View style={{ flexDirection: 'column', paddingLeft: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: '800', color: 'grey', padding: 5 }}>Name : {item.title}</Text>
          <Text style={{ fontSize: 18, fontWeight: '800', color: 'grey', padding: 5 }}>Stock : {item.stock}</Text>
          <Text style={{ fontSize: 20, fontWeight: '800', color: 'grey', padding: 5 }}>Price : {item.price}</Text>
        </View>
        <TouchableOpacity
          style={{ height: '100%', width: '100%', position: 'absolute', bottom: 0, left: '90%', top: '70%' }}
          onPress={() => {
            Dispatch(removeFromCart(item))
          }}>

          <Image style={{ height: '50%', width: '15%' }} source={require('./assets/delete.png')} />

        </TouchableOpacity>
      </View>
    </TouchableNativeFeedback>
  );
  const checkout = async () => {
    if (Cart.length !== 0) {
      const uniqueId = generateRandom11DigitNumber()
      const currentDateAndTime = new Date();
      const formattedDateTime = currentDateAndTime.toLocaleString();
      const order = { OrderId: uniqueId, DateAndTime: formattedDateTime, Price: totalprice }
      Dispatch(addToOrder(order))
      Dispatch(emptyCart())
      try {
        await AsyncStorage.setItem('Order', JSON.stringify([...Order, order]))
      }
      catch (e) {
        Alert.alert(`${e}`)
      }
    }

  }
  const ItemSeparator = () => <View style={styles.separator} />;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text style={{ fontSize: 30, fontWeight: '800', color: 'grey', padding: 5, top: '0%', left: '0%' ,color: '#363737' }}>
          Selected Goods
        </Text>
      </View>
      <FlatList

        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        data={Cart}
        keyExtractor={(item) => {
          if (Cart.find(ele => ele.id === item.id)) {
            return generateRandom11DigitNumber()
          }
          return item.id
        }}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />

      {Cart.length !== 0 ?

        <Animated.View style={{ transform: [{ translateY: PriceInterpolate }], left: '0%', position: 'absolute', bottom: '0%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', width: '100%' }}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: 'grey', padding: 15, left: '5%' }}>
            Total Price : {totalprice}
          </Text>
          <TouchableOpacity onPress={() => {
            checkout()
          }}>
            <View style={{ backgroundColor: 'orange', borderWidth: 3, borderRadius: 10, width: '100%', top: '10%' }} >
              <Text style={{ fontSize: 17, fontWeight: '900', color: 'white', padding: 5 }}>
                Checkout
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        : <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: 'grey', padding: 5, opacity: 0.5 }}>
            No Items
          </Text>
        </View>}
    </View>


  )
}

export default CartScreen

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
  },
  separator: {
    height: 10,
  },
})
function generateRandom11DigitNumber() {
  const min = 10000000000;
  const max = 99999999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString();
}