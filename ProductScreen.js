import { StyleSheet, Text, View, FlatList, Alert, Animated, Image, BackHandler, ActivityIndicator, Dimensions, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ProductDetailsScreen from './ProductDetailsScreen'
import { useDispatch, useSelector } from 'react-redux'
import { assignToArray } from './store/slices/productSlice'

const ProductScreen = () => {
  const { width, height } = Dimensions.get('window');
  const [category, setcategory] = useState([])
  const [activityshow,setActivityShow]=useState(true)
  const [selectedcategory, setSelectedCategory] = useState(null)
  const [ProductDetailsAnimation, setProductDetailsAnimation] = useState(new Animated.Value(0))
  const ProductDetailsInterpolate = ProductDetailsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0]
  })
  const ProductScreenInterpolate = ProductDetailsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width]
  })
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.Product.value)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {

      Animated.timing(ProductDetailsAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()

      return true
    })
    setTimeout(()=>{
      setActivityShow(false)
    },3000)
    // Fetch data from the API
    console.log('ui')
    fetchData();
    return () => backHandler.remove()
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      console.log('lro', response.data.products[0].category)
      dispatch(assignToArray(response.data.products))
      let catagorylist = []
      response.data.products.map((product) => {

        if (!catagorylist.find(ele => ele === product.category)) {
          catagorylist.push(product.category)
          console.log('pro', category, catagorylist)
        }
      })
      setcategory(catagorylist)

      console.log('pro', category, catagorylist)
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert(`NetWorkError`)
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableNativeFeedback
      style={{}}
      onPress={() => {
        showDetails(item);
      }}
    >
      <View style={{ padding: 10, borderBottomWidth: 0.2,backgroundColor:'orange', borderTopWidth: index === 0 ? 0.2 : 0 }}>
        {/* <Image source={{ uri: Product[index].thumbnail }} /> */}
        <Text style={{ fontSize: 20, fontWeight: '800', color: 'grey' }}>{item}</Text>
      </View>
    </TouchableNativeFeedback>
  );
  const showDetails = (cate) => {


    Animated.timing(ProductDetailsAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()
    setSelectedCategory(cate)
  }

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <>




      <Animated.View style={{ transform: [{ translateX: ProductScreenInterpolate }],flexDirection:'row' }}>
        <Text style={{ fontSize: 28, padding: 5, fontWeight: '900', color: '#363737' }}>
          Product Categories 
        </Text>
        <Text style={{ fontSize: 10, marginTop:'6%', fontWeight: '900', color: '#363737' }}>
          (click to view details)
        </Text>
      </Animated.View>
    {category.length===0?
      <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', transform: [{ translateX: ProductScreenInterpolate }] }}>
          <ActivityIndicator size="large" color="grey" style={{  }} />

        </Animated.View>:null}

      {!category ? (
        null
      ) : (
        <Animated.View style={{ justifyContent: 'center', padding: 6, transform: [{ translateX: ProductScreenInterpolate }] }}>
          <FlatList
            data={category}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
          />

        </Animated.View>
      )}
      <ProductDetailsScreen
        Product={Product}
        selectedcategory={selectedcategory}
        ProductDetailsInterpolate={ProductDetailsInterpolate} />
      {/* <View><Text>hd</Text></View> */}

    </>


  )
}

export default ProductScreen

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})