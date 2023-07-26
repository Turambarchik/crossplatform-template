import {NativeModules} from 'react-native';

import {getDeviceId} from 'react-native-device-info';
import Reactotron from 'reactotron-react-native';

let scriptHostname;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

Reactotron.configure({name: 'Unitee', host: scriptHostname, getClientId: async () => getDeviceId()}) // controls connection & communication settings
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
  }) // add all built-in react native plugins
  .connect(); // let's connect!
