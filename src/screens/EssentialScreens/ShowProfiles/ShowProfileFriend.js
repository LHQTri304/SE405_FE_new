import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { UIHeader, CommonButton } from "../../../components";
import axios from "axios";
import { API_BASE_URL } from "../../../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function GroupOption(props) {
  const { text } = props;

  return (
    <View style={styles.groupOptionsView}>
      <Text style={styles.groupOptionsText}>{text}</Text>
    </View>
  );
}

function EachOptionViewOnly(props) {
  const { icon, text } = props;

  return (
    <View style={styles.eachOptionView}>
      <Image source={icon} style={styles.eachOptionIcon} />
      <Text style={styles.eachOptionText}>{text}</Text>
    </View>
  );
}

function EachOptionNavigate(props) {
  const { icon, text, onPress } = props;

  return (
    <TouchableOpacity style={styles.eachOptionView} onPress={onPress}>
      <Image source={icon} style={styles.eachOptionIcon} />
      <Text style={styles.eachOptionText}>{text}</Text>
      <View style={{ flex: 1 }} />
      <Image source={icons.chevronRightIcon} style={styles.eachOptionIcon} />
    </TouchableOpacity>
  );
}

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const ShowProfileFriend = (props) => {
  let { friendUsername } = props.route.params;

  //navigation
  const { navigate, goBack } = props.navigation;

  const [fulName, setFulName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [yearOfBirth, setYearOfBirth] = useState("")
  const [image, setImage] = useState(null)



  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(API_BASE_URL + "/api/v1/information/GetUser?userName=" + friendUsername, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });

        setFulName(response.data.information.fulName);
        setImage(response.data.information.image)

        if (response.data.email == null)
        {
          setEmail('chưa cập nhật');
        }
        else
        {
          setEmail(response.data.email);
        }

        if (response.data.information.phoneNumber == 0)
        {
          setPhoneNumber('chưa cập nhật')
        }
        else
        {
          setPhoneNumber("0"+response.data.information.phoneNumber);
        }

        if (response.data.information.gender == null)
        {
          setGender('chưa cập nhật')
        }
        else
        {
          setGender("0"+response.data.information.gender);
        }

        if (response.data.information.yearOfBirth == 0)
        {
          setYearOfBirth('chưa cập nhật')
        }
        else
        {
          setYearOfBirth(response.data.information.yearOfBirth);
        }
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);


  //handle button here  
  const DeleteFriend = async () => {

    const response = await axios.delete(API_BASE_URL + "/api/v1/friendship/deleteFriend/" + friendUsername, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })
    
    if (response.status)
    {
      alert('Xoá bạn thành công')
      navigate('MainBottomTab', {tabName: "Friends"})
    }

  }

  const ShowPicture = () => {
    navigate("ShowPicture", {file: image})
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View /* the top color */ style={styles.colorView} />
        <View style={styles.mainView}>
          <View /* Profile picture */ style={styles.profileView}>
            <TouchableOpacity style={styles.profileView} onPress={ShowPicture}>
              <Image source={{ uri: image }} style={styles.profileImage} />
              <Text style={styles.profileUsername}>{fulName}</Text>
            </TouchableOpacity>
          </View>

          <GroupOption text={"Thông tin tài khoản"} />

          <EachOptionViewOnly icon={icons.phoneIcon} text={"Số điện thoại: " + phoneNumber} />
          <EachOptionViewOnly icon={icons.emailIcon} text={"Email: " + email} />
          <EachOptionViewOnly icon={icons.personIcon} text={"Giới tính: " + gender} />
          <EachOptionViewOnly icon={icons.documentBlackIcon} text={"Năm sinh: " + yearOfBirth} />

          <CommonButton
            onPress={DeleteFriend}
            title={"Huỷ kết bạn".toUpperCase()}
          />
        </View>
      </ScrollView>

      <UIHeader
        title={null}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={styles.UIHeaderMainStyle}
        iconStyle={styles.UIHeaderIconStyle}
      />
    </View>
  );
};
export default ShowProfileFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  UIHeaderMainStyle: {
    top: 0,
    position: "absolute",
    backgroundColor: null,
  },
  UIHeaderIconStyle: { tintColor: colors.inactive },
  mainView: {
    flex: 1,
    marginTop: 290,
  },
  colorView: {
    height: 400,
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: generateColor(),
  },
  profileView: {
    height: 200,
    alignItems: "center",
  },
  profileImage: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 90,
    borderColor: "white",
    borderWidth: 5,
  },
  profileUsername: {
    color: "black",
    fontSize: fontSizes.h6,
  },
  groupOptionsView: {
    height: 50,
    marginStart: 12,
    justifyContent: "center",
  },
  groupOptionsText: {
    fontSize: fontSizes.h7,
    color: colors.noImportantText,
    paddingStart: 10,
  },
  eachOptionView: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  eachOptionIcon: {
    width: 20,
    height: 20,
    marginStart: 10,
  },
  eachOptionText: {
    fontSize: fontSizes.h6,
    color: "black",
    paddingStart: 15,
  },
});
