import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

/**
 * DetailsScreen - Shows complete details of the selected metal
 */
const DetailsScreen = ({ route, navigation }) => {
  const { metalData } = route.params || {};

  if (!metalData || !metalData.success) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = () => {
    const date = new Date();
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatTimestamp = (ts) => {
    if (!ts) return 'N/A';
    const date = new Date(ts);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.metalName}>{metalData.metal} Details</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.label}>Metal Name</Text>
          <Text style={styles.value}>{metalData.metal}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Current Price (per ounce)</Text>
          <Text style={styles.priceValue}>${metalData.currentPrice?.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>24 Karat Price (per gram)</Text>
          <Text style={styles.priceValue}>${metalData.price24K?.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Previous Open Price</Text>
          <Text style={styles.value}>${metalData.previousOpen?.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Previous Close Price</Text>
          <Text style={styles.value}>${metalData.previousClose?.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Today's Date</Text>
          <Text style={styles.value}>{formatDate()}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Current Time</Text>
          <Text style={styles.value}>{formatTime()}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Last Updated</Text>
          <Text style={styles.timestampValue}>{formatTimestamp(metalData.timestamp)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  metalName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  section: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 24,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  timestampValue: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default DetailsScreen;

