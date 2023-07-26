import {useCallback, useEffect, useState} from 'react';

import {initServices} from 'src/services';
import {hydrateStores} from 'src/stores';
import {configureDesignSystem} from 'src/utils/designSystem';

import {useInitRevenueCat} from './initRevenueCat';

export const useStartApp = () => {
  const [ready, setReady] = useState(false);

  const {initRevenueCat} = useInitRevenueCat();

  const startApp = useCallback(async () => {
    await hydrateStores();
    await initServices();
    await initRevenueCat();
    configureDesignSystem();

    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);

  return ready;
};
