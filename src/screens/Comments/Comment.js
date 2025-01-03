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
import CommentItems from "./CommentItems";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, EnterMessageBar } from "../../components";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../api/DomainAPI";

const Comment = (props) => {

  const { blogID } = props.route.params;

  const [comments, setComments] = useState([]);

  //navigation
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(API_BASE_URL + "/api/v1/blog/getAllCommentInBlog?blogID=" + blogID, {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });
        setComments(response.data)
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 1000);

    // // Hủy interval khi component bị unmounted
     return () => clearInterval(intervalId);
  }, [props.userName]);

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Bình luận trên bài đăng"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        textStyle={{fontSize: fontSizes.h4*0.96}}
      />

      <ScrollView style={styles.listContainer}>
        {comments.map((eachComment) => (
          <CommentItems
            comment={eachComment}
            key={eachComment.commentID}
            onPress={() => {
              navigate("Reply", { comment: eachComment });
            }}
          />
        ))}
      </ScrollView>

      <EnterMessageBar blogID={blogID} actionType={'comment'}/>
    </View>
  );
};
export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
});
