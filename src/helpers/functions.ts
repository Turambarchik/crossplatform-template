import { compose, defaultTo, head, join, juxt, tail, toUpper } from "ramda";

export const capitalizeFirstLetter = compose(
  join(""),
  juxt([compose(toUpper, head), tail])
) as unknown as (phrase: string) => string;

export const defaultString = (value?: string | null, replacer?: string) =>
  defaultTo(defaultTo("", replacer), value);

export const defaultZero = (value?: number | null) => defaultTo(0, value);

export const transformSecondsToTime = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec - minutes * 60;

  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
};

type Model = Record<string, any>;

export const filteredFromActionsModel = (model: Model): Model =>
  Object.fromEntries(
    Object.entries(model).filter(
      ([key, value]) =>
        Object.prototype.toString.call(value) !== "[object Object]"
    )
  );
