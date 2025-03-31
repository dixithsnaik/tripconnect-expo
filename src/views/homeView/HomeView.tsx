import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import useTrackingPath from '../../hooks/useTrackingPath';

const destination = { latitude: 12.3052, longitude: 76.6552 };

const HomeView: React.FC = () => {
  const { currentPosition, path } = useTrackingPath("current", destination);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Sign Out Button at Top-Right */}
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Google Maps */}
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={currentPosition ? {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        } : {
          latitude: destination.latitude, 
          longitude: destination.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {/* User's Live Location */}
        {currentPosition && (
          <Marker coordinate={currentPosition} title="You are here" />
        )}

        {/* Destination Marker */}
        <Marker coordinate={destination} title="Mysore Palace" pinColor="blue" />

        {/* Route Line (Path) */}
        {path && (
          <Polyline
            coordinates={[path.from, path.to]}
            strokeColor="red"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signOutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    zIndex: 1,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default HomeView;