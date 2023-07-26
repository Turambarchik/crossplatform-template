import {EffectCallback, useEffect} from 'react';

const useOnMount = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    effect,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default useOnMount;
