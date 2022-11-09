import React, {FC} from 'react';
import {useColorScheme} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Redux
import store from './redux';

// Styles
import {
  nativeBaseTheme,
  lightNavigationTheme,
  darkNavigationTheme,
} from './styles/theme';

// Screens
import {HomeScreen} from './screens';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  const colorScheme = useColorScheme();

  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <NavigationContainer
          theme={
            colorScheme === 'light' ? lightNavigationTheme : darkNavigationTheme
          }>
          <Stack.Navigator initialRouteName="/">
            {/* Main Screens */}
            <Stack.Screen
              name="/"
              component={HomeScreen}
              options={{headerShown: false}}
            />

            {/* Play Screens */}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ReduxProvider>
  );
};

export default App;
