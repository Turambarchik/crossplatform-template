import { useTranslation } from "react-i18next";

import { useStoreState } from "store/store";

const useResidentDetailsState = () => {
  const { t } = useTranslation();
  const {
    profile: { apartmentDetails },
  } = useStoreState((state) => state);

  return {
    t,
    apartmentDetails,
  };
};

export default useResidentDetailsState;
