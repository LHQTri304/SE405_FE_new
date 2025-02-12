import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { FloatingAction } from "react-native-floating-action";

const floatingActions = [
  {
    text: "Xóa thông báo",
    icon: icons.trashCanIcon,
    name: "bt_delete",
    position: 2,
  },
];

function SubjectBox(props) {
  const { icon, title, content } = props;

  return (
    <View style={styles.SubjectBoxView}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.SubjectBoxContent}>{content}</Text>
    </View>
  );
}

function ContentBox(props) {
  const { icon, title, content } = props;

  return (
    <View style={styles.ContentBoxView}>
      <View style={styles.ContentBoxTopView}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title} onPress={props.OnPressContent}>
          {title}:{" "}
        </Text>
      </View>
      <Text style={styles.ContentBoxContent}>{content}</Text>
    </View>
  );
}

const ShowNotification = (props) => {
  let { header, content, notifycationType, dateSent, notifycationID, files } =
    props.route.params.notification;

  console.log(files)
  var parts = null;

  if (files.length > 0)
  {
    parts = files[0].url
  }

  const date = new Date(dateSent);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const sendingTime = `${hour}:${minute} ${day}/${month}`;

  const [groupName, setGroupName] = useState("");
  const [item, setItem] = useState("");
  const [group, setGroup] = useState("");
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        const extractToken = await axios.get(API_BASE_URL + "/api/v1/information/ExtractBearerToken", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        setUsername(extractToken.data)
        
        const response = await axios.get(
          API_BASE_URL +
            "/api/v1/groupStudying/getNameGroupByNotificationID?notificationID=" +
            notifycationID, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
              },
            }
        );
        setGroupName(response.data);

        const responseItem = await axios.get(
          API_BASE_URL +
            "/api/v1/notifycation/loadNotifycation?notifycationID=" +
            notifycationID, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
              },
            }
        );

        setItem(responseItem.data);

        const responseGroup = await axios.get(
          API_BASE_URL +
            "/api/v1/groupStudying/findGroupbyId?groupID=" +
            (await AsyncStorage.getItem("groupID")), {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
              },
            }
        );
        setGroup(responseGroup.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.userName]);

  //navigation
  const { navigate, goBack } = props.navigation;

  const LoadItem = async () => {
    //alert("As")
    try {
      if (item.documentID == -1) {
        var form = new FormData();
        form.append("blogID", item.blogID);
        const response = await axios.get(
          API_BASE_URL + "/api/v1/blog/getBlogById", form, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
            },
          }
        );

        if (response.status == 200) {
          navigate("ShowPost", { topic: response.data });
        } else {
          alert("Đã có lỗi xảy ra, vui lòng xem trong nhóm");
        }
      } else if (item.blogID == -1) {
          var form = new FormData();
          form.append("documentID", item.documentID);
          const response = await axios.get(
            API_BASE_URL +
              "/api/v1/document/getDocumentById", form, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
                },
              }
          );

          console.log(response.data)
          if (response.status == 200) {
            navigate("ShowDocument", { notification: response.data });
          } else {
            alert("Đã có lỗi xảy ra, vui lòng xem trong nhóm");
          }
      } else {

      }
    } catch (error) {
      alert("Nội dung này đã bị xoá !!");
    }
  };

  const deleleNotification = () => {
    if (userName != group.leaderOfGroup.userName) {
      alert("Bạn không phải nhóm trưởng");
    } else {
      Alert.alert(
        "Xác nhận xoá",
        "Bạn có chắc chắn muốn xoá?",
        [
          {
            text: "Huỷ",
            style: "cancel",
          },
          {
            text: "Xoá",
            style: "destructive",
            onPress: async () => {
              const response = await axios.delete(
                API_BASE_URL +
                  "/api/v1/notifycation/deleteNotifycationForAllMembers?userName=" +
                  (await AsyncStorage.getItem("username")) +
                  "&notifycationID=" +
                  notifycationID +
                  "&groupID=" +
                  (await AsyncStorage.getItem("groupID")), {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
                    },
                  }
              );

              if (response.status == 200) {
                goBack();
              } else {
                alert("Kiểm tra lại mạng, xoá không thành công");
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const ShowPicture = () => {

    if (image == null)
    {
      alert("Nội dung này không có ảnh")
      return;
    }

    navigate("ShowPicture", {file: image})
  }

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thông báo"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={{
          paddingBottom: 20,
        }}
      />

      <ScrollView style={styles.mainView}>
        <SubjectBox icon={icons.groupIcon} title="Nhóm" content={groupName} />

        <SubjectBox
          icon={icons.clockIcon}
          title="Thời gian gửi"
          content={sendingTime}
        />

        <SubjectBox
          icon={icons.menuIcon}
          title="Loại thông báo"
          content={item.notifycationType == "user" ? "Trưởng nhóm" : "Hệ thống"}
        />

        <ContentBox
          icon={icons.priceTagIcon}
          title="Tiêu đề"
          content={item.header}
          OnPressContent={() => {
            LoadItem();
          }}
        />

        <ContentBox
          icon={icons.documentBlackIcon}
          title="Nội dung"
          content={item.content}
          OnPressContent={() => {
            LoadItem();
          }}
        />
        {/* <TouchableOpacity onPress={ShowPicture}>
          <Image
            source={{ uri: parts != null ? parts[0] : null }}
            style={styles.image}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={ShowPicture}>
          {files.map((eachFile, index) => (
          <View key={index} style={styles.imgView}>
            <Image source={{ uri: eachFile.url }} style={[styles.image,/* { width: imageWidth, height: imageHeight, maxWidth: MAXWidth, } */]} />
            {files.length == 0 ? (
              <View />
            ) : (
              <TouchableOpacity
                style={styles.redRemoveImg}
                onPress={() => handleRemoveImageFromList(index)}
              >
              </TouchableOpacity>
            )}
          </View>
        ))}
        </TouchableOpacity>
      </ScrollView>

      {/* <FloatingAction
        actions={floatingActions}
        position="right"
        onPressItem={(name) => {
          name=='bt_edit' ? (
            alert('handle edit')
          ) : (
            deleleNotification()
          );
        }}
      /> */}
    </View>
  );
};
export default ShowNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  mainView: {
    marginTop: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 5,
    marginRight: 10,
  },
  title: {
    color: "black",
    fontSize: fontSizes.h5,
    fontWeight: "500",
  },
  SubjectBoxView: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
  },
  SubjectBoxContent: {
    marginTop: 2,
    color: colors.noImportantText,
    fontSize: fontSizes.h5 * 0.9,
    fontWeight: "700",
  },
  ContentBoxView: {
    flexDirection: "column",
    paddingStart: 15,
    padding: 10,
  },
  ContentBoxTopView: {
    flexDirection: "row",
    alignItems: "center",
  },
  ContentBoxContent: {
    padding: 15,
    marginTop: 5,
    color: "black",
    fontSize: fontSizes.h6,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 5,
    alignSelf: "center",
  },
});
