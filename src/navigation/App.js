import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Login,
  Registration,
  ForgetPassword,
  Verification,
  ResetPassword,
  Messenger,
  MessengerGroup,
  SettingProfile,
  CreatePost,
  CreateNotification,
  ShowPost,
  ResetPasswordInSetting,
  ShowProfileFriend,
  ShowProfileRequest,
  ShowProfileStranger,
} from '../screens';
import UITab from './UITab';

const Stack = createNativeStackNavigator();

function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        <Stack.Screen name="UITab" component={UITab} />
        <Stack.Screen name="Messenger" component={Messenger} />
        <Stack.Screen name="MessengerGroup" component={MessengerGroup} />
        <Stack.Screen name="SettingProfile" component={SettingProfile} />
        <Stack.Screen name="ResetPasswordInSetting" component={ResetPasswordInSetting} />
        
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="CreateNotification" component={CreateNotification} />
        
        <Stack.Screen name="ShowPost" component={ShowPost} />
        <Stack.Screen name="ShowProfileFriend" component={ShowProfileFriend} />
        <Stack.Screen name="ShowProfileRequest" component={ShowProfileRequest} />
        <Stack.Screen name="ShowProfileStranger" component={ShowProfileStranger} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
