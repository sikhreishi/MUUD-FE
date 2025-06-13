# MUUD Health React Native App

A mobile app for journaling and contact management, built for the MUUD Health coding challenge.

## Technologies Used
- React Native
- Redux Toolkit & RTK Query (state management & API)
- React Navigation
- AsyncStorage (for local storage)
- Custom modular UI components

## Features Implemented
- **Journaling Interface:**
  - Entry text input, mood rating (1–5), and submit button
- **Journal History Screen:**
  - List of past entries pulled from backend
- **Contact Management UI:**
  - Contact form for input (contact name and email)
  - List of current contacts for the user
- **Authentication:**
  - JWT-based authentication, token stored in AsyncStorage
  - All API requests include the token in the Authorization header
- **State Management:**
  - Redux Toolkit and RTK Query for efficient data fetching and caching
- **Navigation:**
  - React Navigation for seamless screen transitions

## Setup Instructions

1. Navigate to the MuudMobile directory:
   ```bash
   cd MuudMobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Metro (React Native bundler):
   ```bash
   npm start
   ```
4. Run the app on your device or emulator:
   ```bash
   npm run android   # For Android
   npm run ios       # For iOS
   ```

## Connecting to the Backend
- The app is pre-configured to use the deployed backend on Render.
- To use a local backend, update the `baseUrl` in `src/redux/apiSlice.js`.
- Ensure you register/login to obtain a JWT token for authenticated requests.

## How Requirements Were Met
- All required features from the challenge are implemented:
  - Journaling (entry, mood, history)
  - Contact management (add, list)
  - Secure API integration with JWT
  - State management with Redux Toolkit & RTK Query
  - Modular, user-friendly UI
- Bonus: Local storage of tokens, robust error handling, and consistent UX

## Troubleshooting
- If you have issues running the app, see the [React Native docs](https://reactnative.dev/docs/environment-setup) or check your environment setup.

## Learn More
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Navigation](https://reactnavigation.org/)
