import React from "react";
import PagerView from "react-native-pager-view";
import Animated from "react-native-reanimated";

import { localization } from "helpers/constants";
import { IMAGES } from "helpers/images";

import { AnimetedIndicator } from "../components/AnimetedIndicator/AnimetedIndicator";
import { SlideView } from "../components/SlideView/SlideView";
import { useOnboarding } from "./onboarding.state";

const SLIDES = 5;
const onboard = localization.onboarding;

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

const Onboarding = () => {
  const {
    handler,
    viewPager,
    currentIndexPage,
    goToTheSlide,
    onClickLastSlide,
    t,
  } = useOnboarding(SLIDES);

  return (
    <>
      <AnimatedPager
        ref={viewPager}
        initialPage={0}
        offscreenPageLimit={SLIDES}
        onPageScroll={handler}
        style={{ flex: 1 }}
      >
        <SlideView
          key="1"
          index={1}
          imageBackgroundSource={IMAGES.Onboarding1}
          title={t(onboard.first.title)}
          text={t(onboard.first.text)}
          onClickButton={goToTheSlide}
        />
        <SlideView
          key="2"
          index={2}
          isDark
          imageBackgroundSource={IMAGES.Onboarding2}
          title={t(onboard.second.title)}
          text={t(onboard.second.text)}
          onClickButton={goToTheSlide}
        />
        <SlideView
          key="3"
          index={3}
          imageBackgroundSource={IMAGES.Onboarding3}
          title={t(onboard.third.title)}
          text={t(onboard.third.text)}
          onClickButton={goToTheSlide}
        />
        <SlideView
          key="4"
          index={4}
          isDark
          imageBackgroundSource={IMAGES.Onboarding4}
          title={t(onboard.fourth.title)}
          text={t(onboard.fourth.text)}
          onClickButton={goToTheSlide}
        />
        <SlideView
          key="5"
          index={5}
          imageBackgroundSource={IMAGES.Onboarding5}
          title={t(onboard.fifth.title)}
          text={t(onboard.fifth.text)}
          onLastScreen
          onClickButton={onClickLastSlide}
        />
      </AnimatedPager>
      <AnimetedIndicator length={SLIDES} currentIndexPage={currentIndexPage} />
    </>
  );
};

export default Onboarding;
