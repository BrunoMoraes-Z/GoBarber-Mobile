import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SingIn from '../pages/SignIn';
import SingUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
      // initialRouteName="SingUp"
    >
      <Auth.Screen name="SignIn" component={SingIn} />
      <Auth.Screen name="SignUp" component={SingUp} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
