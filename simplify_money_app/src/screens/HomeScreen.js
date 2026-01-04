import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MetalCard from '../components/MetalCard';
import { fetchMetalPrice } from '../services/metalApi';

/**
 * HomeScreen - Displays 4 metal tiles with independent loading states
 */
const HomeScreen = ({ navigation }) => {
  const [metals, setMetals] = useState({
    gold: { loading: false, data: null, error: null },
    silver: { loading: false, data: null, error: null },
    platinum: { loading: false, data: null, error: null },
    palladium: { loading: false, data: null, error: null },
  });

  const [refreshing, setRefreshing] = useState(false);

  /**
   * Fetches price for a specific metal
   */
  const loadMetalPrice = async (metalName) => {
    setMetals((prev) => ({
      ...prev,
      [metalName]: { ...prev[metalName], loading: true, error: null },
    }));

    const result = await fetchMetalPrice(metalName);

    setMetals((prev) => ({
      ...prev,
      [metalName]: {
        loading: false,
        data: result.success ? result : null,
        error: result.success ? null : result.error,
      },
    }));
  };

  /**
   * Loads all metals independently
   */
  const loadAllMetals = () => {
    const metalNames = ['gold', 'silver', 'platinum', 'palladium'];
    metalNames.forEach((metal) => {
      loadMetalPrice(metal);
    });
  };

  /**
   * Initial load when screen mounts
   */
  useEffect(() => {
    loadAllMetals();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadAllMetals();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Refresh when screen comes into focus
   */
  useFocusEffect(
    useCallback(() => {
      loadAllMetals();
    }, [])
  );

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    loadAllMetals();
    setTimeout(() => setRefreshing(false), 1000);
  };

  /**
   * Navigate to details screen
   */
  const handleMetalPress = (metalName) => {
    const metalData = metals[metalName]?.data;
    if (metalData && metalData.success) {
      navigation.navigate('Details', { metalData });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Metals Price Tracker</Text>
        <Text style={styles.subtitle}>Live prices updated every 30 seconds</Text>
      </View>

      <MetalCard
        metal="Gold"
        price24K={metals.gold.data?.price24K}
        currentPrice={metals.gold.data?.currentPrice}
        timestamp={metals.gold.data?.timestamp}
        loading={metals.gold.loading}
        error={metals.gold.error}
        onPress={() => handleMetalPress('gold')}
      />

      <MetalCard
        metal="Silver"
        price24K={metals.silver.data?.price24K}
        currentPrice={metals.silver.data?.currentPrice}
        timestamp={metals.silver.data?.timestamp}
        loading={metals.silver.loading}
        error={metals.silver.error}
        onPress={() => handleMetalPress('silver')}
      />

      <MetalCard
        metal="Platinum"
        price24K={metals.platinum.data?.price24K}
        currentPrice={metals.platinum.data?.currentPrice}
        timestamp={metals.platinum.data?.timestamp}
        loading={metals.platinum.loading}
        error={metals.platinum.error}
        onPress={() => handleMetalPress('platinum')}
      />

      <MetalCard
        metal="Palladium"
        price24K={metals.palladium.data?.price24K}
        currentPrice={metals.palladium.data?.currentPrice}
        timestamp={metals.palladium.data?.timestamp}
        loading={metals.palladium.loading}
        error={metals.palladium.error}
        onPress={() => handleMetalPress('palladium')}
      />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;

