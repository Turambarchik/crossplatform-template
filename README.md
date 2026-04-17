# Crossplatform Template

## 🚀 What is this?
A TypeScript-based React Native template for resident-facing service apps, with modular features for authentication, requests, news, notifications, and profile management.
It also includes a reusable Kanban UI module for web-style task boards.

## 🎯 Problem it solves
Building property/resident service apps from scratch usually means repeating the same plumbing: auth flows, navigation, state, API integration, push notifications, and request tracking.
This template provides that baseline so teams can start from a working architecture instead of re-implementing core app foundations.

## ✨ Key Features
- Modular domain structure (`auth`, `requests`, `news`, `profile`, `notification-history`, `services`) to keep feature code isolated and maintainable.
- Full auth journey with phone/SMS verification, PIN creation/verification, token refresh handling, and biometric support hooks.
- Resident service request lifecycle support (new → in progress → completed/canceled), including category-based request metadata and review states.
- Push notification integration with unread notification synchronization and in-app navigation handling.
- Persisted app/auth state using Easy Peasy + AsyncStorage, plus centralized Axios configuration for authenticated API calls.
- Built-in localization scaffold (currently Ukrainian) and shared theming system for consistent UI.

## 🛠 Tech Stack
- React Native + TypeScript
- React Navigation (stack + tabs)
- Easy Peasy (state management) + Redux middleware utilities
- Axios (API client)
- i18next + react-i18next (localization)
- styled-components
- Firebase Messaging + Sentry
- React Beautiful DnD + Material UI (Kanban module)

## ⚡ Quick Start
```bash
# 1) Install dependencies
npm install

# 2) Start Metro
npm run start

# 3) Run the app
npm run android
# or
npm run ios
```

## 📦 Scripts
- `npm run start` — start Metro bundler
- `npm run android` — run Android app
- `npm run ios` — run iOS app
- `npm run lint` — run lint checks (if configured)
- `npm test` — run tests (if configured)

## 📌 Notes
- Environment values are expected via `react-native-config` (for example API auth client values and Sentry DSN).
- The repository includes both modern Easy Peasy store setup (`src/store2`) and legacy Redux setup (`src/store1`); choose one as the canonical path before extending.
- Ukrainian translation resources are present by default (`src/localization/translations/ua.json`).
