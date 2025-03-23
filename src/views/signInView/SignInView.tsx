import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@env';
const SignInScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID, 
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
  
      console.log("Google User Info:", JSON.stringify(userInfo, null, 2));
  
      const idToken = userInfo.data?.idToken; 
  
      if (!idToken) throw new Error("Google Sign-In failed: No ID token returned");
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign In with Google" onPress={signInWithGoogle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
