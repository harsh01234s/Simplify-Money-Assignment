# Metals Price Tracker App

A React Native Expo application that displays live prices for Gold, Silver, Platinum, and Palladium.

## Features

- **4 Metal Tiles**: Display Gold, Silver, Platinum, and Palladium prices
- **Independent Loading**: Each metal tile has its own loader
- **Auto-refresh**: Prices update every 30 seconds
- **Error Handling**: Individual error handling per metal
- **Navigation**: Tap any tile to view detailed information
- **Pull-to-Refresh**: Swipe down to manually refresh prices

## Tech Stack

- React Native with Expo
- JavaScript
- React Navigation (Stack Navigator)
- Axios (for API calls)
- Functional components with hooks

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## Project Structure

```
src/
 ├─ screens/
 │   ├─ HomeScreen.js      # Main screen with 4 metal tiles
 │   └─ DetailsScreen.js   # Detailed view of selected metal
 ├─ components/
 │   ├─ MetalCard.js       # Reusable metal tile component
 │   └─ Loader.js          # Loading indicator component
 ├─ services/
 │   └─ metalApi.js        # API service for fetching metal prices
 └─ navigation/
     └─ AppNavigator.js    # Navigation configuration
```

## API Service

The app uses a mock API service that simulates real-time price updates. To use a real API:

1. Uncomment the alternative implementation in `src/services/metalApi.js`
2. Add your API key
3. Adjust the response parsing as needed

## Features Explained

### Independent Loaders
Each metal tile loads independently, so if one API call fails, others continue to work.

### Auto-refresh
Prices automatically refresh every 30 seconds to simulate live updates.

### Error Handling
If an API call fails, an error message is displayed in that specific tile without affecting others.


### Approach
- Designed the app using a service-based architecture to keep UI and data logic separate
- Implemented independent data fetching and loaders for each metal to mimic real-world fintech pricing behavior
- Used a local JSON-based mock database as a fallback when live APIs are unavailable
- Focused on clarity, reliability, and user feedback over visual complexity

### Challenges
- Managing independent loading and error states without blocking the entire screen
- Ensuring price refresh intervals felt “live” but not disruptive
- Designing a scalable structure while keeping the codebase simple

### Notes / Open Considerations
- Live WebSocket-based pricing can be added for true real-time updates
- Historical charts and pull-to-refresh can be integrated as future enhancements


## License

This is an internal assignment project.

