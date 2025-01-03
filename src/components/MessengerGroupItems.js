import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../api/DomainAPI";

export default function MessengerGroupItems(props) {
  let { content, dateSent, id, user } = props.item;
  let files = props.files;

  const { navigate } = props;

  const date = new Date(dateSent);
  const timeSent = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
    date.getMonth() + 1
  }`;

  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);

  const [username, setUsername] = useState("");
  const [sentUsername, setSentUsername] = useState("");
  const [sender, setSender] = useState("");

  const MAXWidth = 245;
  const [imageWidth, setImageWidth] = useState(500);
  const [imageHeight, setImageHeight] = useState(500);

  /* const getImageSize = (uri) => {
    Image.getSize(uri, (width, height) => {
      const temp = width > MAXWidth ? width / MAXWidth : 1;
      setImageWidth(width);
      setImageHeight(height / temp);
    });
  }; */

  useEffect(() => {
    const fetchData = async () => {
      //console.log(files[0].url)

      try {
        setUsername(await AsyncStorage.getItem("username"));
        const response = await axios.get(
          API_BASE_URL + "/api/v1/messagegroup/getSentUserInGroup?messID=" + id,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer " + (await AsyncStorage.getItem("username")),
            },
          }
        );

        setImage(response.data.information.image);
        setSentUsername(response.data.userName);

        const checkSender = await axios.get(
          API_BASE_URL + "/api/v1/information/ExtractBearerToken",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer " + (await AsyncStorage.getItem("username")),
            },
          }
        );

        setSender(checkSender.data);

        files.length > 0
          ? setIsImage(false)
          : (setIsImage(true),
            setImage(props.item.images[0].toString().split("-")[0])); //,
        //getImageSize(props.item.images[0].toString().split("-")[0])
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  const CheckIsSender = () => {
    if (sender == sentUsername) {
      return true;
    } else {
      return false;
    }
  };

  const ShowProfile = async () => {
    navigate("ShowProfile", { userReplied: user });
  };

  return CheckIsSender() == false ? (
    <TouchableOpacity
      /** isSender = false --> avatar > message */ style={styles.container}
      onPress={ShowProfile}
    >
      <Image style={styles.avatar} source={{ uri: image }} />

      <View style={styles.mainTextView}>
        <View style={styles.leftView}>
          <Text style={styles.subText}>
            {user.information.fulName} | {timeSent}
          </Text>
        </View>
        <View style={styles.leftView}>
          {files.length > 0 ? (
            files.map((file) => (
              <Image
                style={[
                  styles.image,
                  {
                    width: 50,
                    height: 50,
                    //width: file.width,
                    //height: file.height,
                  },
                ]}
                source={{ uri: file.url }}
              />
            ))
          ) : (
            <Text style={styles.message}>{content}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      /** isSender = true --> message > avatar */ style={styles.container}
      onPress={ShowProfile}
    >
      <View style={styles.mainTextView}>
        <View style={styles.rightView}>
          <Text style={styles.subText}>{timeSent}</Text>
        </View>
        <View style={styles.rightView}>
          {files.length > 0 ? (
            files.map((file) => (
              <Image
                style={[
                  styles.image,
                  {
                    width: 50,
                    height: 50,
                    //width: file.width,
                    //height: file.height,
                  },
                ]}
                source={{ uri: file.url }}
              />
            ))
          ) : (
            <Text style={styles.message}>{content}</Text>
          )}
        </View>
      </View>

      <Image style={styles.avatar} source={{ uri: image }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    minHeight: 90,
    paddingTop: 20,
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 55,
    height: 55,
    resizeMode: "cover",
    borderRadius: 30,
    marginTop: 9,
    marginRight: 15,
    alignSelf: "flex-start",
  },
  message: {
    color: "black",
    fontSize: fontSizes.h7,
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: colors.SecondaryContainer,
    borderRadius: 10,
  },
  myMessage: {
    color: "black",
    fontSize: fontSizes.h7,
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: "rgb(231, 236, 242)",
    borderRadius: 10,
  },
  leftView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
  },
  rightView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
  mainTextView: {
    flexDirection: "column",
    flex: 1,
    marginRight: 10,
  },
  subText: {
    marginBottom: 3,
    color: colors.active,
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "flex-end",
    textAlign: "right",
  },
});
