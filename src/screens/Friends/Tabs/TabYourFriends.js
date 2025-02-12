import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TabYourFriendsItems from "./TabYourFriendsItems";
import { images, icons, colors, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { friend_getAllFriendList } from "../../../api";

export default function TabYourFriends(props) {
  const [friends, setFriends] = useState([]);

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  const fetchData = async () => {
    try {
      const response = await friend_getAllFriendList();
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [props.userName]);

  const SelectedFriend = async (myUsername, friendUsername, state) => {
    await AsyncStorage.setItem("friend", "chat");
    navigate("Messenger", {
      myUsername: myUsername,
      friendUsername: friendUsername,
      state: state,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item, index }) => (
          <TabYourFriendsItems
            friend={item}
            key={item.ID}
            onPress={(myUserName, friendUsername, state) => {
              SelectedFriend(myUserName, friendUsername, state);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
});
