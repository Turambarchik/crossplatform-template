import { makeStyles, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";

interface Props {
  onAddCard: () => void;
}
const styles = (global: Theme) => ({
  addColumnText: {
    textTransform: "uppercase",
    fontSize: 13,
    letterSpacing: 1.16,
    lineHeight: "16px",
    color: "#7B4FF0",
  } as CSSProperties,
  card: {
    marginTop: 4,
    height: 40,
    backgroundColor: "#E8EBFD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: global.borderRadius,
  },
});

const useStyles = makeStyles(styles);

export const AddCard = (props: Props) => {
  const { onAddCard } = props;
  const classes = useStyles();

  return (
    <div onClick={onAddCard} className={classes.card}>
      <div className={classes.addColumnText}>{`+ Add card`}</div>
    </div>
  );
};
