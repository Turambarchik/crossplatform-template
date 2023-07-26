import * as Sentry from "@sentry/react-native";
import type { Event, Extras } from "@sentry/types";

type SeverityLevel = "fatal" | "error" | "warning" | "log" | "info" | "debug";

export const useSentry = () => {
  const sentrySendCustomEvent = (
    message: string,
    level: SeverityLevel,
    dict: Extras
  ) => {
    const customEvent: Event = {
      message: message,
      level: level,
      extra: dict,
    };

    Sentry.captureEvent(customEvent);
  };

  return {
    sentrySendCustomEvent,
  };
};
