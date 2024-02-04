import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import store from './store/storeIndex'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import Navigator from './Navigator'
import messaging from '@react-native-firebase/messaging'

export default function App() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL; 
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('Unable to get permission to notify.');
    }
  };
  // eHrAlJXER2umgOML-Ayq6_:APA91bGi1uJpV3EfoAquCSnco04ez78pRtwse6m5uSNsG0chuRaVBEn0Hw8Kj0BXsJkPyHiopE6s3ZPTueHhjlYc1aXRmL2fLlpOjtSVRGaqkbO_MWSSsjazjp_kXJY-ujMK9LU4Je9J 
  const ca=async()=>{ 
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
      } else {
        console.log('No FCM token received');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  }
  useEffect(() => {
    requestUserPermission()
   ca()
    const unsubscribeOnNotificationTap = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification tapped by the user!', JSON.stringify(remoteMessage));
    });

    const unsubscribeOnBackgroundNotificationTap = messaging().setBackgroundMessageHandler(remoteMessage => {
      console.log('Notification tapped by the user from background!', JSON.stringify(remoteMessage));
    });

    return () => {
      unsubscribeOnNotificationTap();
      // unsubscribeOnBackgroundNotificationTap();
    };
  }, []);
  return (
  <Provider store={store}>
    <Navigator/>
  </Provider>
  )
}