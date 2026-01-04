import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * Reusable Loader component
 */
const Loader = ({ size = 'small', color = '#FFD700' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default Loader;

