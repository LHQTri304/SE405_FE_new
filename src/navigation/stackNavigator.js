import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Login,
  Registration,
  ForgetPassword,
  Verification,
  ResetPassword,
  UserProfile,
  ResetPasswordInProfile,
  SettingProfile,
  Friends,
  GroupChat,
  AllNotification,
  MessengerGroup,
  ShowPost,
  Comment,
  Reply,
  //
  GameTab,
  GamePicWord,
  GameWordSort,
} from '../screens';
import MainBottomTab from './MainBottomTab';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainBottomTab" component={MainBottomTab} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen
          name="ResetPasswordInProfile"
          component={ResetPasswordInProfile}
        />
        <Stack.Screen name="SettingProfile" component={SettingProfile} />

        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
        <Stack.Screen name="AllNotification" component={AllNotification} />

        <Stack.Screen name="MessengerGroup" component={MessengerGroup} />
        <Stack.Screen name="ShowPost" component={ShowPost} />
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="Reply" component={Reply} />



        <Stack.Screen name="GameTab" component={GameTab} />
        <Stack.Screen name="GamePicWord" component={GamePicWord} />
        <Stack.Screen name="GameWordSort" component={GameWordSort} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
