import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home';
import CalendarScreen from './CalendarScreen';
import DeliveryDetailsScreen from './DeliveryDetails';
import DeliveriesScreen from './Deliveries';
import ContactsScreen from './Contacts';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: false }} // Nascondi il titolo qui
    />
    <Stack.Screen name="Calendar" component={CalendarScreen} />
    <Stack.Screen name="DeliveryDetails" component={DeliveryDetailsScreen} />
  </Stack.Navigator>
);

const Layout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Deliveries') {
            iconName = 'document-text';
          } else if (route.name === 'Contacts') {
            iconName = 'people';
          } 

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#c3262f',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Deliveries" component={DeliveriesScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
    </Tab.Navigator>
  );
};

export default Layout;
