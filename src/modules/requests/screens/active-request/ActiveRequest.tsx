import { useHeaderHeight } from "@react-navigation/elements";
import type { Route } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { isNil } from "ramda";
import React from "react";

import { EmptyScreen } from "components/molecules/empty-screen/EmptyScreen";
import { Loader } from "components/molecules/loader/Loader";
import { DEVICE_HEIGHT } from "helpers/constants";
import { useCustomBackHandler } from "hooks/useBackhandler";
import { useCheckisUnLogged } from "hooks/useCheckisUnLogged";
import type { RootStackParams, Routes } from "modules/app/Routes";
import { CanceledBuilder } from "modules/requests/components/builders/canceled-builder/CanceledBuilder";
import { CanceledButtonBuilder } from "modules/requests/components/builders/canceled-button-builder/CanceledButtonBuilder";
import { CategoryBuilder } from "modules/requests/components/builders/category-builder/CategoryBuilder";
import { CheckReviewBuilder } from "modules/requests/components/builders/check-review-builder/CheckReviewBuilder";
import { CreatedBuilder } from "modules/requests/components/builders/created-builder/CreatedBuilder";
import { DeadlineBuilder } from "modules/requests/components/builders/deadline-builder/DeadlineBuilder";
import { ImagesListBuilder } from "modules/requests/components/builders/images-list-builder/ImagesListBuilder";
import { LeaveFeedbackButtonBuilder } from "modules/requests/components/builders/leave-feedback-button-builder/LeaveFeedbackButtonBuilder";
import { ReviewBuilder } from "modules/requests/components/builders/review-builder/ReviewBuilder";
import { StatusBuilder } from "modules/requests/components/builders/status-builder/StatusBuilder";
import { SubjectOfTheAppealBuilder } from "modules/requests/components/builders/subject-of-the-appeal-builder/SubjectOfTheAppealBuilder";

import { useActiveRequest } from "./activeRequest.state";
import { ActiveRequestStyles as Styles } from "./activeRequest.styles";

const { Wrapper, ScrollView, Line } = Styles;

const ActiveRequest = () => {
  const {
    params: { id },
  } = useRoute<Route<string, RootStackParams[Routes.ActiveRequest]>>();
  useCheckisUnLogged();
  useCustomBackHandler({});
  const headerHeight = useHeaderHeight();

  const { activeRequest, isNetworkError, isLoading } = useActiveRequest(id);

  if (isNetworkError) {
    return <EmptyScreen marginTop={DEVICE_HEIGHT / 2.5} text="" />;
  }

  return (
    <Wrapper>
      {!isNil(activeRequest) && (
        <ScrollView headerHeight={headerHeight}>
          <Line />
          <StatusBuilder item={activeRequest} />
          <CanceledBuilder item={activeRequest} />
          <DeadlineBuilder item={activeRequest} />
          <CategoryBuilder item={activeRequest} />
          <SubjectOfTheAppealBuilder item={activeRequest} />
          <CreatedBuilder item={activeRequest} />
          <ImagesListBuilder item={activeRequest} />
          <ReviewBuilder item={activeRequest} />
          <CanceledButtonBuilder item={activeRequest} />
          <LeaveFeedbackButtonBuilder item={activeRequest} />
          <CheckReviewBuilder item={activeRequest} />
        </ScrollView>
      )}
      <Loader visible={isLoading} transparent />
    </Wrapper>
  );
};

export default ActiveRequest;
