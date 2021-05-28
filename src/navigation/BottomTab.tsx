import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList} from '../../types';
import LoggedInNavigator from "./LoggedIn";
import LoggedOutNavigator from "./LoggedOut";
import MenuNavigator from "./Menu";
import SavoredListNavigator from "./SavoredList";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    // TODO: Get isLoggedIn from Authentication global state
    let isLoggedIn: Boolean = true;

    return (
        <BottomTab.Navigator
          initialRouteName="Menu"
          tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
          <BottomTab.Screen
            name="Chef"
            component={isLoggedIn ? LoggedInNavigator : LoggedOutNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="chef-hat" color={color} />,
            }}
          />
          <BottomTab.Screen
            name="Menu"
            component={MenuNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="map-outline" color={color} />,
            }}
          />
          <BottomTab.Screen
            name="SavoredList"
            component={SavoredListNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="heart-multiple-outline" color={color} />,
            }}
          />
        </BottomTab.Navigator>
      )
}

function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
    return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
  }