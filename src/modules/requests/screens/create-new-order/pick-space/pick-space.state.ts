import { useTranslation } from "react-i18next";

import { useStoreState } from "store/store";

export const usePickSpace = () => {
  const { t } = useTranslation();

  const {
    app: { mySpaces },
  } = useStoreState((state) => state);

  return {
    mySpaces,
    t,
  };
};
