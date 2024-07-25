import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import HomeScreen from './app/Home';
import CalendarView from './app/CalendarView';
import DeliveryDetailsScreen from './app/DeliveryDetails';
import DeliveriesScreen from './app/Deliveries';
import ContactsScreen from './app/Contacts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#c3262f',
    accent: '#c3262f',
  },
};

const App = () => {
  const HomeTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'DeliveriesTab') {
            iconName = 'document-text';
          } else if (route.name === 'ContactsTab') {
            iconName = 'people';
          } else if (route.name === 'CalendarTab') {
            iconName = 'calendar';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#c3262f',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="DeliveriesTab" component={DeliveriesScreen} options={{ title: 'Deliveries' }} />
      <Tab.Screen name="ContactsTab" component={ContactsScreen} options={{ title: 'Contacts' }} />
      <Tab.Screen name="CalendarTab" component={CalendarView} options={{ title: 'Calendar' }} />
    </Tab.Navigator>
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Calendar" component={DeliveriesScreen} />
          <Stack.Screen name="DeliveryDetails" component={DeliveryDetailsScreen} />
          <Stack.Screen name="Calendary" component={CalendarView}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
