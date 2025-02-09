import React, { useRef, memo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, Icon } from "../../components";
import * as Animatable from "react-native-animatable";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TabYourGroups from "./Tabs/TabYourGroups";

const TabArr = [
  {
    route: "YourGroups",
    label: "Đã Tham Gia",
    icon: icons.groupIcon,
    component: TabYourGroups,
    color: colors.RedContainer,
    alphaClr: colors.GrayOnContainerAndFixed,
  },
];

const Tab = createMaterialTopTabNavigator();

const TabButton = memo(({ item, onPress, accessibilityState }) => {
  const viewRef = useRef(null);
  const focused = accessibilityState.selected;

  const iconSize = focused ? 25 : 20;
  const iconColor = focused ? item.alphaClr : colors.PrimaryBackground;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.tabButtonContainer, { flex: focused ? 1 : 0.15 }]}
    >
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: item.color, borderRadius: 8 },
          ]}
        />
        <View
          style={[
            styles.btn,
            {
              borderColor: item.alphaClr,
              backgroundColor: focused ? null : item.alphaClr,
              paddingHorizontal: focused ? "20%" : null,
            },
          ]}
        >
          <Icon name={item.icon} size={iconSize} color={iconColor} />
          {focused && <Text style={styles.focusedLabel}>{item.label}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const CustomTabBar = memo(({ state, descriptors, navigation }) => (
  <View style={styles.tabContainer}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index;
      const onPress = () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented)
          navigation.navigate(route.name);
      };
      return (
        <TabButton
          key={index}
          item={TabArr[index]}
          onPress={onPress}
          accessibilityState={{ selected: isFocused }}
        />
      );
    })}
  </View>
));

export default function GroupChat() {
  return (
    <SafeAreaView style={styles.container}>
      <UIHeader title="Hội Nhóm" />
      <View style={styles.displayView}>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          {TabArr.map((item, index) => (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
            />
          ))}
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  displayView: { flex: 1, backgroundColor: colors.GrayBackground },
  tabContainer: {
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 8,
    backgroundColor: colors.PrimaryContainer,
    justifyContent: "space-around",
  },
  tabButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "99%",
  },
  focusedLabel: { color: colors.GrayOnContainerAndFixed, paddingHorizontal: 8 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
});
