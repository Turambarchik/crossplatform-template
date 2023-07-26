import * as Sentry from "@sentry/react-native";
import Config from "react-native-config";

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: Config.SENTRY_DSN,
  debug: !__DEV__,
  enableAutoSessionTracking: true,
  enableNativeCrashHandling: true,
  enableNative: true,
  ignoreErrors: [/Aborting/, /Axios/, /Server/],
  beforeSend: (event) => event,
  environment: __DEV__ ? "development" : "production",
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
});
