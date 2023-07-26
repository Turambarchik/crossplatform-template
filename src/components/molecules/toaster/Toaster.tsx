import type { Ref } from "react";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import type { Message, Position } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Spacer } from "components/atoms/spacer/Spacer";
import { Typography } from "components/atoms/typography/Typography";
import { localization } from "helpers/constants";

import { ToasterStyles } from "./toaster.styles";

const { Container, ContentSection, IconSection } = ToasterStyles;

export enum ToasterMessageType {
  success = "success",
  warning = "warning",
}

type ToasterProps = {
  localFlashMessageInsdieModal?: Ref<FlashMessage>;
};

export const Toaster = ({ localFlashMessageInsdieModal }: ToasterProps) => {
  const ref = useRef<FlashMessage>(null);

  const { t } = useTranslation();

  return (
    <FlashMessage
      hideOnPress
      ref={localFlashMessageInsdieModal ? localFlashMessageInsdieModal : ref}
      position="bottom"
      MessageComponent={({
        message: MessageProps,
      }: {
        message: Message & { position: Position };
      }) => {
        const { type, message, description, position } = MessageProps;
        const isSuccessMessageType = type === ToasterMessageType.success;

        const title = message
          ? message
          : isSuccessMessageType
          ? t(localization.general.success)
          : t(localization.general.somethingWrong);

        return (
          <Container
            android_disableSound
            isSuccess={isSuccessMessageType}
            positionDirection={position}
            onPress={ref?.current?.hideMessage}
          >
            <IconSection>
              <SVGIcon type={isSuccessMessageType ? "success" : "warning"} />
            </IconSection>
            <ContentSection>
              <Typography fz="fz16" color="tertiaryColor">
                {title}
              </Typography>
              {description && (
                <>
                  <Spacer height={10} />
                  <Typography fz="fz14" numberOfLines={3} color="tertiaryColor">
                    {description as string}
                  </Typography>
                </>
              )}
            </ContentSection>
          </Container>
        );
      }}
    />
  );
};
