/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import axios from "axios";

 let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU4NDI2MTI2LCJpYXQiOjE2NTA2NTAxMjYsImp0aSI6IjBjZTllZmQxZGNiMzQ5YmFhYzMwZmNhMTY4MDJiNzQzIiwidXNlcl9pZCI6MTF9.FT_GbvhOgjcJ8fZFlqM1YH7pMnwvroyaArEIN7thz5U"
// declare const global: any;

// global.FormData = global.originalFormData;


 
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
      let fd = new FormData();
      fd.append("fdata", "L");
    
      try {
      axios.post("http://192.168.88.203:8000/api/maintenance/create_basic_order/", fd,   {headers: { Authorization: "Bearer " + token}});
        
      } catch (error) {
          console.log(error);
      }
  }, [])
 
  return (
    <SafeAreaView>
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
