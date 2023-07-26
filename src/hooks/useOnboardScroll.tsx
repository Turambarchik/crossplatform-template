import {useState} from 'react';

import {useServices} from 'src/services';
import {useStores} from 'src/stores';

export const useOnboardScroll = (content: any[]) => {
  const {nav} = useServices();
  const {UserStore} = useStores();

  const [activeIndex, onChange] = useState(0);

  const handleRedirect = () => {
    if (UserStore.isGolfer || UserStore.isClubMember) {
      nav.push('CreateAccount');
      return;
    }
    nav.push('Login');
  };

  const handleContinue = () => {
    onChange((prev: number) => prev + 1);

    if (content.length === activeIndex + 1) {
      handleRedirect();
      return;
    }
  };

  const handleBack = () => {
    if (activeIndex === 0) {
      nav.pop();
      return;
    }

    onChange((prev: number) => prev - 1);
  };

  return {activeIndex, onChange, handleSkip: handleRedirect, handleBack, handleContinue};
};
