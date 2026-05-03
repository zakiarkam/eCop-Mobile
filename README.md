# eCop Mobile App

A comprehensive React Native mobile application for traffic enforcement and police operations. The eCop mobile app enables officers to manage violations, records, payments, and announcements on the go.

## Overview

eCop Mobile is a cross-platform React Native application built with TypeScript, providing real-time access to traffic violations, license holder information, and payment records. The app features a bottom tab navigation system with multiple authentication and content screens.

## Features

- **Authentication**: Secure user login and verification system
- **License Holder Management**: View and manage license holder information
- **Violation Records**: Track and document traffic violations
- **Payment Tracking**: Monitor paid fines and payments
- **Police Announcements**: Receive and view important announcements
- **Document Management**: Capture and store images and documents
- **Offline Support**: Async storage for data persistence
- **Payment Integration**: Stripe integration for online payments
- **Responsive UI**: Optimized for various device sizes

## Prerequisites

- Node.js (v18+) and npm/yarn
- React Native development environment setup
- For iOS: Xcode, CocoaPods, and Ruby
- For Android: Android Studio and Android SDK

## Installation

1. **Clone and install dependencies**:
   ```bash
   cd mobile
   npm install
   ```

2. **iOS Setup** (if building for iOS):
   ```bash
   bundle install
   bundle exec pod install
   ```

3. **Environment Setup**: 
   Create a `.env` file with necessary API endpoints and keys.

## Development

### Start Development Server

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

### Run Tests

```bash
npm test
```

### Lint Code

```bash
npm run lint
```

## Project Structure

```
Src/
├── Assets/          # Images and media assets
├── Components/      # Reusable UI components
│   ├── CustomButton.tsx
│   ├── CustomInput.tsx
│   ├── OTPInput.tsx
│   └── [Feature Components]/
├── Navigations/     # Navigation configuration
│   ├── AuthNavigator.tsx
│   ├── BottomNavigator.tsx
│   └── RootNavigator.tsx
├── Screens/         # Screen components
│   ├── AuthScreens/
│   ├── MainScreens/
│   └── SplashScreen/
├── Services/        # API and storage services
│   └── UserStorageService.ts
└── Styles/          # Global styles
```

## Key Dependencies

- **React Native 0.79.2**: Core framework
- **React Navigation**: Navigation library (bottom-tabs, native-stack, stack)
- **Stripe**: Payment processing (`@stripe/stripe-react-native`)
- **Async Storage**: Local data persistence
- **React Native Vector Icons**: Icon library
- **Gesture Handler & Reanimated**: Smooth animations
- **Image Picker & Camera Roll**: Media handling

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro development server |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm test` | Run test suite |
| `npm run lint` | Lint code with ESLint |

## Development Guidelines

- Use TypeScript for type safety
- Follow the existing component structure in `Src/Components/`
- Store UI styles in component files or `Src/Styles/`
- Use `UserStorageService` for local data management
- Implement screens in `Src/Screens/` with appropriate navigation

## Troubleshooting

### Metro Server Issues
- Clear cache: `npm start -- --reset-cache`
- Kill Metro and restart: `npm start`

### iOS Build Issues
- Clean build folder: `xcode-select --reset`
- Reinstall pods: `rm -rf ios/Pods Podfile.lock && bundle exec pod install`

### Android Build Issues
- Clean gradle: `cd android && ./gradlew clean`
- Rebuild: `npm run android`

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [Stripe React Native Documentation](https://stripe.com/docs/stripe-js/react-native)
