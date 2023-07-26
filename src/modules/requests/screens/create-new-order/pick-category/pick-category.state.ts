import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { AddressType } from "types";

import { localization } from "helpers/constants";
import { addressNameConverter } from "helpers/converter";
import { HeaderCloseButton } from "modules/requests/components/header-close-button/HeaderCloseButton";
import { useSetHeader } from "modules/requests/hooks/useHeader";
import { useStoreState } from "store/store";

export const usePickCategory = () => {
  const { t } = useTranslation();

  const {
    requests: { newOrder },
  } = useStoreState((state) => state);

  const { setRequestHeader } = useSetHeader();

  useEffect(() => {
    setRequestHeader({
      currentText: t(localization.requests.newRequest),
      currentHeaderTitle: addressNameConverter(
        newOrder.space?.address as AddressType
      ),
      HeaderRight: HeaderCloseButton,
    });
  }, [newOrder.space, setRequestHeader, t]);

  return {
    t,
  };
};
