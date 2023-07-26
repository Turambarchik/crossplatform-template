import { useEffect } from "react";

import { useStoreActions, useStoreState } from "store/store";

export const useSetUnreadNotifications = () => {
  const {
    notification: { getTotalItemsUnread },
  } = useStoreActions((state) => state);

  const {
    common: { isLoged },
  } = useStoreState((state) => state);

  useEffect(() => {
    if (isLoged) {
      getTotalItemsUnread();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoged]);
};
