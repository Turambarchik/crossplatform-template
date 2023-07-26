import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { KanbanCard } from "./KanbanCard";

interface Props {
  item: Document;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  index: number;
  setRowHeight: any;
  style: any;
}

const styles = (global: Theme) => ({});

const useStyles = makeStyles(styles);

export const CardWrapper = React.memo(function DraggableCardWrapper(
  props: Props
) {
  const { setRowHeight, provided, snapshot, item, index, style } = props;

  const classes = useStyles();

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    ...draggableStyle,
    ...style,
  });

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <KanbanCard
        index={index}
        setRowHeight={setRowHeight}
        item={item}
        isDragging={snapshot.isDragging}
      />
    </div>
  );
});
