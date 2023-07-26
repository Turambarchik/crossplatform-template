import Clipboard from "@react-native-community/clipboard";
import { defaultTo, difference, equals, isNil } from "ramda";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useStoreActions, useStoreState } from "store/store";

const useApartmentDetailsState = () => {
  const { t } = useTranslation();
  const {
    profile: {},
  } = useStoreActions((actions) => actions);
  const {
    profile: { apartmentDetails },
  } = useStoreState((state) => state);

  const owner = defaultTo(
    [],
    apartmentDetails?.citizens.filter((el) =>
      equals(el.phone, apartmentDetails?.owner?.phone)
    )
  );

  const citizens = useMemo(
    () =>
      !isNil(apartmentDetails)
        ? defaultTo([], difference(apartmentDetails.citizens, owner))
        : [],
    [apartmentDetails, owner]
  );

  const sortCitizens = [...owner, ...citizens];

  const handleCopyAccountMumber = useCallback(() => {
    apartmentDetails && Clipboard.setString(apartmentDetails.account);
  }, [apartmentDetails]);

  return {
    t,
    sortCitizens,
    handleCopyAccountMumber,
    apartmentDetails,
  };
};

export default useApartmentDetailsState;
