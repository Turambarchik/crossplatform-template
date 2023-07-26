import { StackActions, useNavigation } from "@react-navigation/native";
import { isNil } from "ramda";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { localization } from "helpers/constants";
import { addressNameConverter } from "helpers/converter";
import { Routes } from "modules/app/Routes";
import { useSetHeader } from "modules/requests/hooks/useHeader";
import { useStoreActions, useStoreState } from "store/store";

export const useActiveRequest = (
  id: number,
  openedFromPush?: boolean,
  notificationId?: string
) => {
  const { t } = useTranslation();
  const { setRequestHeader } = useSetHeader();
  const navigation = useNavigation();

  const {
    requests: { activeRequest, isLoading },
    app: { currentSpace, mySpaces },
    common: { isNetworkError },
  } = useStoreState((state) => state);
  const {
    app: { setCurrentSpace },
    requests: { getActiveRequest, setIsLoading, setRequestList },
    notification: { readNorification },
  } = useStoreActions((state) => state);

  useEffect(() => {
    if (notificationId) {
      setIsLoading(true);

      readNorification({ id: notificationId }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [notificationId, readNorification, setIsLoading]);

  const spaceFromOrderPush = useMemo(() => {
    if (
      activeRequest &&
      currentSpace &&
      activeRequest.space.complex !== currentSpace.complex
    ) {
      return activeRequest;
    }
  }, [currentSpace, activeRequest]);

  useEffect(() => {
    if (openedFromPush && !isNil(spaceFromOrderPush) && mySpaces) {
      const selectedSpace = mySpaces.find(
        (el) => el.complex === spaceFromOrderPush.space.complex
      );
      if (selectedSpace) {
        setCurrentSpace(selectedSpace);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRequest, openedFromPush, spaceFromOrderPush]);

  useEffect(() => {
    setRequestHeader({
      currentText: `${t(localization.requests.request)} ${id}`,
      currentHeaderTitle: activeRequest
        ? addressNameConverter(activeRequest?.addressData)
        : undefined,
      navigateBackCustom: () => {
        if (isNil(openedFromPush)) {
          navigation.goBack();
        } else {
          navigation.dispatch(StackActions.replace(Routes.TabBar));
        }
      },
    });
  }, [activeRequest, id, navigation, openedFromPush, setRequestHeader, t]);

  useEffect(() => {
    const getData = async () => {
      if (!isNil(id)) {
        setIsLoading(true);
        try {
          await getActiveRequest({ id });
        } finally {
          setIsLoading(false);
        }
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    isNetworkError,
    activeRequest,
    isLoading,
  };
};
