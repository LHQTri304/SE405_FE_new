import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";
import { messenger_sendMessageForUser } from "../api";

const EnterMessageBar = (props) => {
  //use for friend-MessageBar
  const { myUsername, friendUsername, stompClient, friendID } = props;
  //actionType: friend (0) - group (1) - comment (2) - reply (3) - chatbot (4)
  const { actionType } = props;
  const [typedText, setTypedText] = useState("");

  const handleSendMessage_Friend = async () => {
    if (typedText.length == 0) {
      alert("Hãy nhập tin nhắn");
      return;
    }

    const response = await messenger_sendMessageForUser(friendUsername, typedText);

    if (response.status == 200) {
      setTypedText("");
      const messagePayload = { groupID: friendID };
      //console.log(friendID);
      //console.log("sending");
      stompClient.send(
        "/app/sendMessForUser",
        {},
        JSON.stringify(messagePayload)
      );
      //console.log("sent");
    } else {
      alert("Có lỗi mạng, vui lòng gửi lại sau");
    }
  };

  //final handleVerification
  const handleSendMessage = async () => {
    if (actionType === 0 || actionType === "friend") {
      handleSendMessage_Friend();
    } else if (actionType === 1 || actionType === "group") {
      alert('testing')
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        style={styles.textInput}
        onChangeText={(typedText) => {
          setTypedText(typedText);
        }}
        value={typedText}
        placeholder="Nhắn tin"
        placeholderTextColor={colors.placeholder}
      />
      <TouchableOpacity onPress={handleSendMessage}>
        <Icon
          name={icons.sendMessageCursorIcon}
          size={25}
          color={colors.PrimaryBackground}
        />
      </TouchableOpacity>
    </View>
  );
};
export default EnterMessageBar;

const styles = StyleSheet.create({
  container: {
    height: "auto",
    minHeight: 50,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  textInput: {
    width: "85%",
    color: "black",
    paddingStart: 10,
  },
  sendIcon: {
    width: 25,
    height: 25,
    resizeMode: "stretch",
    padding: 10,
    marginHorizontal: 10,
    tintColor: colors.PrimaryBackground,
  },
});