import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Components
import {Icon} from '@/components/shared';

// Screens
import {PlayScreen, StatisticsScreen} from '@/screens';

const Tab = createBottomTabNavigator();

const HomeScreen: FC = () => {
  return (
    <Tab.Navigator initialRouteName="/play">
      <Tab.Screen
        name="/play"
        component={PlayScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Play',
          tabBarIcon: ({focused, size, color}) => (
            <Icon name="home" focused={focused} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="/statistics"
        component={StatisticsScreen}
        options={{
          headerTitle: 'Statistics',
          tabBarLabel: 'Statistics',
          tabBarIcon: ({focused, size, color}) => (
            <Icon
              name="stats-chart"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
