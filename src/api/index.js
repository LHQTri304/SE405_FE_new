//AuthScreens
import { user_login } from "./AuthScreens/user_login";
import {
  user_register,
  user_createAccountData,
} from "./AuthScreens/user_register";
import {
  auth_getRecoveryCode,
  auth_getAuthOTP,
  auth_changePasswordAfterOTP,
} from "./AuthScreens/user_recoveringPassword";

//UserProfileScreens
import {
  profile_getUser,
  profile_getAvatar,
  profile_uploadImage,
} from "./UserProfileScreens/user_profile";
import { user_profile_changePassword } from "./UserProfileScreens/user_changePassword";

//NotificationScreens
import {
  notifications_getAllByUserName,
  notifications_checkNewByNotifycationID,
} from "./NotificationScreens/notifications_getAll";
import {
  notifications_getNameGroupByNotifycationID,
  notifications_loadNotifycation,
  notifications_getBlogById,
  notifications_getDocumentById,
} from "./NotificationScreens/notifications_loadAndShow";

//GroupChatScreens
import { group_findGroupById } from "./GroupChatScreens/group_findGroupById";
import {
  group_getAllGroupofUser,
  group_checkNewMessage,
} from "./GroupChatScreens/group_tab_yourGroups";
import { group_findGroupbyName } from "./GroupChatScreens/group_tab_suggestions";

//FriendsListScreens
import {
  friend_getAllFriendList,
  friend_checkNewMessage,
} from "./FriendsListScreens/friend_tab_yourFriends";

export {
  user_login,
  //
  user_register,
  user_createAccountData,
  //
  auth_getRecoveryCode,
  auth_getAuthOTP,
  auth_changePasswordAfterOTP,
  //
  profile_getUser,
  profile_getAvatar,
  profile_uploadImage,
  //
  user_profile_changePassword,
  //
  notifications_getAllByUserName,
  notifications_checkNewByNotifycationID,
  notifications_getNameGroupByNotifycationID,
  notifications_loadNotifycation,
  notifications_getBlogById,
  notifications_getDocumentById,
  //
  group_findGroupById,
  group_getAllGroupofUser,
  group_checkNewMessage,
  group_findGroupbyName,
  //
  friend_getAllFriendList,
  friend_checkNewMessage,
};
