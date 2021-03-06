import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Provider } from "react-redux";

import store from "./store";

import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ReviewScreen from "./screens/ReviewScreen";

const MainNavigator = createStackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    auth: { screen: AuthScreen },
    main: {
      screen: createBottomTabNavigator(
        {
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            }),
            // this is primarily an android compatibility setting
            tabBarPosition: 'bottom',
            // Optional: Override the `navigationOptions` for the screen
            // Note this fixed not being ableto set the title in the ReviewScreen component
            navigationOptions: () => ({
              title: "Review",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="favorite" size={30} color={tintColor} />
              )
            })
          }
        },
        {
          tabBarOptions: {
            labelStyle: {
              fontSize: 12
            }
          }
        }
      )
    }
  },
  {
    headerMode: "none"
  }
);

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
