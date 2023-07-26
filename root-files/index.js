/**
 * needed for AWS-IOT
 */
import './shim';

import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import 'react-native-reanimated';
import {navigatePushOnPress} from 'src/utils/push-notifications';
if (__DEV__) {
  import('./src/reactotron').then(() => console.log('Reactotron Configured'));
}

import {AppRegistry, LogBox, Platform, Text, TextInput} from 'react-native';
import reactotron from 'reactotron-react-native';
import {onMessageReceived} from 'src/hooks/usePushNotifications';
import {setStorageItem} from 'src/stores/_hydration';
import App from './App';
import {name as appName} from './app.json';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

LogBox.ignoreLogs([
  // Lib cycle, no impact on app
  'Require cycle: index.js -> App.tsx -> src/app.tsx -> src/screens/index.ts -> src/screens/stacks.ts -> src/screens/modals.ts -> src/screens/screens.ts -> src/screens/scan-qr/index.ts -> src/screens/scan-qr/scan-qr.tsx -> src/screens/scan-qr/useQrScan.tsx -> node_modules/vision-camera-code-scanner/src/index.ts -> node_modules/vision-camera-code-scanner/src/hook.tsx -> index.js',
  'EventEmitter.removeListener',
  '`new NativeEventEmitter()`',
  '[react-native-gesture-handler] Seems like', // https://github.com/software-mansion/react-native-gesture-handler/issues/1831
  'Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment',
  'Warning: Encountered two children with the same key, `1`',
  'Clipboard has been extracted from react-native core',
  'transform[stderr]:',
  'CanceledError',
]);

PushNotification.configure({
  onRegister: event => {
    setStorageItem('deviceToken', event.token);
  },
  senderID: '795919373037',
  channelId: 'Android_channel_message',
  popInitialNotification: true,
});

if (Platform.OS === 'android') {
  messaging().setBackgroundMessageHandler(onMessageReceived);
}

notifee.onBackgroundEvent(async event => {
  if (__DEV__) {
    reactotron?.log?.('onBackgroundEvent INDEXJS', event);
  }
  const {type, detail} = event;
  const pushData = detail.notification?.data;

  if (type === EventType.PRESS) {
    navigatePushOnPress(pushData);
  }
});
AppRegistry.registerComponent(appName, () => App);
