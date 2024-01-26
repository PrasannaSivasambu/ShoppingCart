import { Animated, StyleSheet, Text, View, FlatList, TouchableNativeFeedback, Dimensions, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from './store/slices/CartSlice';

export default function ProductDetailsScreen({ Product, selectedcategory, ProductDetailsInterpolate }) {
  const CategorizedProduct = Product.filter((ele) => ele.category === selectedcategory)
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch()
  const addCart = (item) => {
    dispatch(addToCart(item))
  }
  const renderItem = ({ item, index }) => (
    <TouchableNativeFeedback
      // style={{width:'100%'}}
      onPress={() => {
        addCart(item);
      }}
    >
      <View style={{ padding: 10, flexDirection: 'row', left: 15, width: width - 30, borderRadius: 15, backgroundColor: 'orange' }}>
        <Image source={{ uri: item.thumbnail }} style={{ height: '60%', width: '15%', padding: 5, top: 6 }} />
        <View style={{ flexDirection: 'column', left: '75%' }}>
          <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: '800', color: 'grey', padding: 5 }}>Name : {item.title}</Text>
          <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '800', color: 'grey', padding: 5 }}>Brand : {item.brand}</Text>
          <Text style={{ fontSize: 20, fontWeight: '800', color: 'grey', padding: 5 }}>Discount : {item.discountPercentage}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
  const ItemSeparator = () => <View style={styles.separator} />;
  return (

    <Animated.View style={{ transform: [{ translateX: ProductDetailsInterpolate }], position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

        <Text style={{ fontSize: 30, padding: 5, fontWeight: '900', color: 'grey' }}>
          Product Details
        </Text>

      </View>

      <FlatList

        data={CategorizedProduct}
        keyExtractor={(item => item.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      // contentContainerStyle={styles.flatListContainer}
      >
        <View>
          <Text>
            henkh
          </Text>
        </View>
      </FlatList>

    </Animated.View>
  )
}

const styles = StyleSheet.create({
  // flatListContainer: {
  //   flexGrow: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  itemContainer: {
    padding: 10,
  },
  separator: {
    height: 10,
  },
})