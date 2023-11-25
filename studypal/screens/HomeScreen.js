import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, DrawerLayoutAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const drawerRef = useRef(null);
  const route = useRoute();
  const { userName, email } = route.params?.params || {};

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current.closeDrawer();
  };

  const navigateToScreen = (screen) => {
    // Add navigation logic to navigate to the selected screen
    console.log(`Navigate to ${screen}`);
    closeDrawer(); // Close the drawer after navigation
  };

  const navigationView = (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerProfile}>
        <View style={styles.circleContainer}>
          <Image
            source={require('../assets/images/cat.jpg')}
            style={styles.iconImage}
          />
        </View>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('Screen1')}>
        <Text style={styles.drawerItem}>Screen 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Screen2')}>
        <Text style={styles.drawerItem}>Screen 2</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      {/* Add more drawer items as needed */}
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={218}
      drawerPosition={'right'}
      renderNavigationView={() => navigationView}
    >
      <SafeAreaView style={styles.homeStyles}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My{'\n'}Decks</Text>
          <TouchableOpacity onPress={openDrawer} style={styles.hamburgerIcon}>
            <View style={styles.circleContainer}>
              <Image
                source={require('../assets/images/cat.jpg')}
                style={styles.iconImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  homeStyles: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 40,
    paddingHorizontal: 18.5,
  },
  hamburgerIcon: {},
  circleContainer: {
    width: 54,
    height: 54,
    borderWidth: 0.5,
    borderRadius: 32,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  drawerProfile: {
    marginTop: 15,
    marginHorizontal: 18.75,
    flexDirection: 'row',
  },
  iconImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 60,
    fontWeight: 'regular',
    lineHeight: 60,
    letterSpacing: 0.25,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#09090A',
    fontSize: 12.5,
    fontWeight: 'bold',
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  drawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    color: 'black',
  },
});
