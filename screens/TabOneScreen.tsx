import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import Snapchat, { stories } from "./../snapchat/Snapchat";
import { SnapchatRoutes } from "../snapchat/Model";
// import Story from './../snapchat/Story';
import StoryComp from "./../snapchat/Story";

export const assets = stories
  .map((story) => [story.avatar, story.source])
  .flat();

const Stack = createStackNavigator<SnapchatRoutes>();
const Navigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: "transparent" },
    }}
    mode="modal"
  >
    <Stack.Screen name="Snapchat" component={Snapchat} />
    <Stack.Screen name="Story" component={StoryComp} />
  </Stack.Navigator>
);

export default function TabOneScreen() {
  /*
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab 1 - Snapchat clone</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.js" />
    </View>
  );
  */
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: "transparent" },
      }}
      mode="modal"
    >
      <Stack.Screen name="Snapchat" component={Snapchat} />
      <Stack.Screen name="Story" component={StoryComp} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
