import type { Route } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useStoreActions, useStoreState } from "store/store";

const useNewsDetailsScreenState = () => {
  const { t } = useTranslation();
  const {
    app: { currentSpace, mySpaces },
    news: { newsDetails },
  } = useStoreState((state) => state);
  const {
    app: { setCurrentSpace },
    news: { getNewsDetails, setEmergencyNewsList, setNewsList },
  } = useStoreActions((actions) => actions);
  const {
    params: { id, openedFromPush },
  } = useRoute<Route<string, { id: string; openedFromPush?: boolean }>>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const newsImage = useMemo(
    () => newsDetails && newsDetails.gallery.files[0],
    [newsDetails]
  );

  const spaceFromNewsPush = useMemo(
    () =>
      newsDetails &&
      currentSpace &&
      newsDetails.areas.find((el) => el.complex !== currentSpace.complex),
    [currentSpace, newsDetails]
  );

  useEffect(() => {
    if (openedFromPush) {
      setEmergencyNewsList(null);
      setNewsList(null);
      if (spaceFromNewsPush && mySpaces) {
        const selectedSpace = mySpaces.find(
          (el) => el.complex === spaceFromNewsPush.complex
        );
        selectedSpace && setCurrentSpace(selectedSpace);
      }
    }
  }, [
    mySpaces,
    openedFromPush,
    setCurrentSpace,
    setEmergencyNewsList,
    setNewsList,
    spaceFromNewsPush,
    newsDetails,
  ]);

  useEffect(() => {
    setIsLoading(true);
    getNewsDetails({ id }).finally(() => {
      setIsLoading(false);
    });
  }, [getNewsDetails, id]);

  return {
    t,
    isLoading,
    newsImage,
    newsDetails,
  };
};

export default useNewsDetailsScreenState;
