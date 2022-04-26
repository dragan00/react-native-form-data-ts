 import React from 'react';
 import AppNavigation from './src/navigation';
 import {SafeAreaProvider} from 'react-native-safe-area-context';
 import {GestureHandlerRootView} from 'react-native-gesture-handler';
 import {NavigationContainer} from '@react-navigation/native';
 
 const App: React.FC = () => {
   return (
	   <GestureHandlerRootView style={{flex: 1}}>
		 <SafeAreaProvider>
		   <NavigationContainer>
			 <AppNavigation />
		   </NavigationContainer>
		 </SafeAreaProvider>
	   </GestureHandlerRootView>
   );
 };
 
 export default App;
 