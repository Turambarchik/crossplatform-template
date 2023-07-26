import { useEffect, useState } from "react";
import BackgroundTimer from "react-native-background-timer";

import { transformSecondsToTime } from "helpers/functions";

export const useSecondsTimer = (
  initialSecondsNumber: number | undefined | null,
  isTimerOn: boolean
) => {
  const [counter, setCounter] = useState(Number(initialSecondsNumber));

  useEffect(() => {
    setCounter(Number(initialSecondsNumber));
  }, [initialSecondsNumber]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setCounter((count) => {
        if (count > 0) {
          return count - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    if (!counter) {
      BackgroundTimer.stopBackgroundTimer;
    }
  }, [counter]);

  useEffect(() => {
    if (isTimerOn) {
      startTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [isTimerOn]);

  return transformSecondsToTime(counter);
};
