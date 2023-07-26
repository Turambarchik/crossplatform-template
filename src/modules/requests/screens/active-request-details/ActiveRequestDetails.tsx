import { isNil } from "ramda";
import React from "react";

import { EmptyScreen } from "components/molecules/empty-screen/EmptyScreen";
import { DEVICE_HEIGHT } from "helpers/constants";
import { DetailReviewBuilder } from "modules/requests/components/builders/detail-review-builder/DetailReviewBuilder";
import { LeaveFeedbackButtonBuilder } from "modules/requests/components/builders/leave-feedback-button-builder/LeaveFeedbackButtonBuilder";

import { useActiveRequestDetails } from "./activeRequest.state";
import { ActiveRequestStyles as Styles } from "./activeRequest.styles";

const { Wrapper } = Styles;

const ActiveRequestDetails = () => {
  const { activeRequest, isNetworkError } = useActiveRequestDetails();

  if (isNetworkError) {
    return <EmptyScreen marginTop={DEVICE_HEIGHT / 2.5} text="" />;
  }

  return (
    <Wrapper>
      {!isNil(activeRequest) && (
        <>
          <DetailReviewBuilder item={activeRequest} />
          <LeaveFeedbackButtonBuilder item={activeRequest} />
        </>
      )}
    </Wrapper>
  );
};

export default ActiveRequestDetails;
