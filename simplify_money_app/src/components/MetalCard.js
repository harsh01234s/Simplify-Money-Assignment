import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

/**
 * MetalCard component - Displays metal price information in a tile
 */
const MetalCard = ({
  metal,
  price24K,
  currentPrice,
  timestamp,
  loading,
  error,
  onPress,
}) => {
  const formatTimestamp = (ts) => {
    if (!ts) return 'N/A';
    const date = new Date(ts);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={loading || error}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.metalName}>{metal}</Text>
        {loading && (
          <ActivityIndicator size="small" color="#FFD700" style={styles.loader} />
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>24 Karat Price</Text>
            <Text style={styles.price24K}>${price24K?.toFixed(2) || '0.00'}/g</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Current Price</Text>
            <Text style={styles.currentPrice}>
              ${currentPrice?.toFixed(2) || '0.00'}/oz
            </Text>
          </View>

          <View style={styles.timestampContainer}>
            <Text style={styles.timestampLabel}>Last Updated</Text>
            <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  loader: {
    marginLeft: 8,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
  },
  errorContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
  priceContainer: {
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price24K: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFD700',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1976D2',
  },
  timestampContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  timestampLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
});

export default MetalCard;

