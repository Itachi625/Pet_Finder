import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import HomePage from './src/components/HomePage';
import DogPage from './src/components/DogPage';

const Stack = createStackNavigator();

const defaultHeader = {
  headerStyle: {
    backgroundColor: '#d36c6c',
  },
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{...defaultHeader}}>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerTitleAlign: 'center',
            title: 'Find your Dog',
          }}
        />
        <Stack.Screen
          name="DogPage"
          component={DogPage}
          options={{
            headerTitleAlign: 'center',
            title: 'Dog Page',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
