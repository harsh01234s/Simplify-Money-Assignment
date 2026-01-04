import axios from 'axios';

// Base prices for each metal (in USD per ounce)
const BASE_PRICES = {
  gold: 2000,
  silver: 25,
  platinum: 1000,
  palladium: 1200,
};

/**
 * Simulates API delay
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates a random price variation (±2%)
 */
const getRandomVariation = (basePrice) => {
  const variation = (Math.random() - 0.5) * 0.04; // ±2%
  return basePrice * (1 + variation);
};

/**
 * Formats timestamp
 */
const getTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Fetches metal price data
 * @param {string} metal - The metal name (gold, silver, platinum, palladium)
 * @returns {Promise} Promise that resolves to metal price data
 */
export const fetchMetalPrice = async (metal) => {
  try {
    // Simulate network delay (500ms - 2000ms)
    const delayTime = Math.random() * 1500 + 500;
    await delay(delayTime);

    // Simulate occasional API failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error(`Failed to fetch ${metal} price`);
    }

    const basePrice = BASE_PRICES[metal.toLowerCase()];
    if (!basePrice) {
      throw new Error(`Unknown metal: ${metal}`);
    }

    const currentPrice = getRandomVariation(basePrice);
    const previousOpen = getRandomVariation(basePrice * 0.99);
    const previousClose = getRandomVariation(basePrice * 1.01);

    // Calculate 24K price (assuming 24K is pure, so same as current price per ounce)
    // Converting to per gram for 24K display
    const pricePerGram = currentPrice / 31.1035; // 1 ounce = 31.1035 grams
    const price24K = pricePerGram;

    return {
      metal: metal.charAt(0).toUpperCase() + metal.slice(1),
      currentPrice: parseFloat(currentPrice.toFixed(2)),
      price24K: parseFloat(price24K.toFixed(2)),
      previousOpen: parseFloat(previousOpen.toFixed(2)),
      previousClose: parseFloat(previousClose.toFixed(2)),
      timestamp: getTimestamp(),
      success: true,
    };
  } catch (error) {
    return {
      metal: metal.charAt(0).toUpperCase() + metal.slice(1),
      error: error.message || 'Failed to fetch price',
      success: false,
    };
  }
};

