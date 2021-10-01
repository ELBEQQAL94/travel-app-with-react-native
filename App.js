// LIBS
import React from 'react';

// React Native Navigation
import {NavigationContainer} from '@react-navigation/native';

// React Native Stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import {OnBoarding} from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="On Boarding" component={OnBoarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
