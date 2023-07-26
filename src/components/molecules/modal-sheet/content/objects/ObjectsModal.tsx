import { isNil } from "ramda";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "components/atoms/section/Section";
import { RadioButton } from "components/molecules/radio-button/RadioButton";
import { localization } from "helpers/constants";
import { addressNameConverter } from "helpers/converter";
import { useStoreActions, useStoreState } from "store/store";

import { ModalSheetStyles } from "../../modalSheet.styles";
import type { ObjectsModalProps } from "../../modalSheet.types";
import { ObjectsModalStyles } from "./objectsModal.styles";

const {
  Container,
  Line,
  Separator,
  Wrapper,
  HeaderText,
  Button,
  ButtonText,
  RadioButtonsContainer,
} = ObjectsModalStyles;

export const ObjectsModal = ({ isOpen, setIsOpen }: ObjectsModalProps) => {
  const { t } = useTranslation();

  const {
    app: { mySpaces, currentSpace },
  } = useStoreState((state) => state);
  const {
    app: { setCurrentSpace },
  } = useStoreActions((state) => state);
  const [selectedSpaceId, setSelectedSpaceId] = useState("");

  useEffect(() => {
    if (isNil(currentSpace)) return;
    setSelectedSpaceId(currentSpace.id);
  }, [currentSpace]);

  if (isNil(mySpaces) || isNil(currentSpace)) return null;

  const handleChangeSpace = () => {
    setIsOpen(false);
    const selectedSpace = mySpaces.find((el) => el.id === selectedSpaceId);
    if (isNil(selectedSpace)) return;
    setCurrentSpace(selectedSpace);
  };

  return isOpen ? (
    <ModalSheetStyles.Modal
      isVisible={isOpen}
      withSwiped
      onModalHide={setIsOpen.bind(null, false)}
    >
      <Wrapper>
        <Container>
          <Line />
          <HeaderText>{t(localization.general.chooseObject)}</HeaderText>
          <Separator marginTop={16} marginBottom={16} />
          {mySpaces.map((el, idx) => (
            <Section key={idx}>
              <RadioButtonsContainer>
                <RadioButton
                  selected={el.id === selectedSpaceId}
                  onPress={setSelectedSpaceId.bind(null, el.id)}
                >
                  {`${addressNameConverter(el.address)}`}
                </RadioButton>
              </RadioButtonsContainer>
              <Separator />
            </Section>
          ))}
          <Button variant="primary" fullWidth onPress={handleChangeSpace}>
            <ButtonText>{t(localization.general.changeObject)}</ButtonText>
          </Button>
        </Container>
      </Wrapper>
    </ModalSheetStyles.Modal>
  ) : null;
};
