import { Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useRef } from "react";
import { KANBAN_CARD_WIDTH } from "../constants";

interface Props {
  item: any;
  isDragging: boolean;
  index: number;
  setRowHeight: any;
}

const styles = (global: Theme) => ({
  card: {
    width: KANBAN_CARD_WIDTH,
    border: "1px solid #D7D7DB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    boxSizing: "border-box",
    "&:hover": {
      border: "1px solid #B1B1B3",
      boxShadow: "0px 1px 3px rgba(12, 12, 13, 0.08)",
    },
  } as CSSProperties,
  imageContainer: {} as CSSProperties,

  image: {
    width: "100%",
    height: 154,
    // objectFit: 'contain',
    objectFit: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  } as CSSProperties,
  draggingCard: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #B1B1B3",

    boxShadow: "0px 1px 3px rgba(12, 12, 13, 0.08)",
    borderRadius: 8,
    transform: "rotate(-3deg)",
  },
});

const useStyles = makeStyles(styles);

const __KanbanCard = (props: Props) => {
  const classes = useStyles();
  const { item, isDragging, setRowHeight, index } = props;
  const rowRef: any = useRef({});

  useEffect(() => {
    rowRef.current && setRowHeight(index, rowRef.current.clientHeight);
    // Put in depedency if you want to rerender card height immediately
    // eslint-disable-next-line
  }, [rowRef]);

  return (
    <div
      onClick={() => {}}
      ref={rowRef}
      id={`item_preview_card_kanban_${item.docId}`}
      className={isDragging ? classes.draggingCard : classes.card}
    >
      <div>card</div>
    </div>
  );
};

export const KanbanCard = __KanbanCard;
